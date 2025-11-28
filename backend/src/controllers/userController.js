import pool from '../config/db.js';

export const syncUser = async (req, res) => {
  const { id, email_addresses, first_name, last_name } = req.body;

  console.log('Syncing user payload:', req.body);

  // Safety check
  if (!id || !email_addresses || email_addresses.length === 0) {
    return res.status(400).json({ error: 'Invalid user data' });
  }

  // Clerk sends 'emailAddress' (camelCase), but we might expect 'email_address'
  const emailObj = email_addresses[0];
  const email = emailObj.emailAddress || emailObj.email_address;

  if (!email) {
    console.error('Could not extract email from:', emailObj);
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE clerk_user_id = $1', [id]);

    if (userCheck.rows.length > 0) {
      // User exists, maybe update? For now just return
      return res.status(200).json({ message: 'User already exists', user: userCheck.rows[0] });
    }

    // Create new user
    const newUser = await pool.query(
      'INSERT INTO users (clerk_user_id, email, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, email, first_name, last_name]
    );

    res.status(201).json({ message: 'User created', user: newUser.rows[0] });
  } catch (err) {
    console.error('Error syncing user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
