import pool from "../config/db.js";

export const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.*, users.first_name, users.last_name, users.clerk_user_id as author_clerk_id
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      ORDER BY posts.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const createPost = async (req, res) => {
  const {
    title,
    content,
    image_url,
    category,
    clerk_user_id,
    email,
    first_name,
    last_name,
  } = req.body;

  try {
    // Get internal user ID from clerk_user_id
    let userResult = await pool.query(
      "SELECT id FROM users WHERE clerk_user_id = $1",
      [clerk_user_id]
    );

    let user_id;

    if (userResult.rows.length === 0) {
      // User not found by Clerk ID. Check by email.
      if (email) {
        const emailCheck = await pool.query(
          "SELECT id FROM users WHERE email = $1",
          [email]
        );

        if (emailCheck.rows.length > 0) {
          // User exists with this email. Update their Clerk ID.
          user_id = emailCheck.rows[0].id;
          await pool.query(
            "UPDATE users SET clerk_user_id = $1, first_name = $2, last_name = $3 WHERE id = $4",
            [clerk_user_id, first_name, last_name, user_id]
          );
        } else {
          // User really doesn't exist. Create them.
          try {
            const newUser = await pool.query(
              "INSERT INTO users (clerk_user_id, email, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id",
              [clerk_user_id, email, first_name, last_name]
            );
            user_id = newUser.rows[0].id;
          } catch (createErr) {
            console.error(
              "Error creating user during post creation:",
              createErr
            );
            return res
              .status(500)
              .json({
                error: `Failed to create user record: ${createErr.message}`,
              });
          }
        }
      } else {
        return res
          .status(404)
          .json({ error: "User not found and email not provided" });
      }
    } else {
      user_id = userResult.rows[0].id;
    }

    const newPost = await pool.query(
      "INSERT INTO posts (user_id, title, content, image_url, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, title, content, image_url, category]
    );

    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { clerk_user_id } = req.body;

  try {
    // Check if user exists
    const userResult = await pool.query(
      "SELECT id FROM users WHERE clerk_user_id = $1",
      [clerk_user_id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user_id = userResult.rows[0].id;

    // Check if post exists and belongs to user
    const postResult = await pool.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const post = postResult.rows[0];
    if (post.user_id !== user_id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Delete post
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getPostsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT posts.*, users.first_name, users.last_name, users.clerk_user_id as author_clerk_id
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      WHERE posts.category = $1
      ORDER BY posts.created_at DESC
    `,
      [category]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching posts by category:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT posts.*, users.first_name, users.last_name, users.clerk_user_id as author_clerk_id
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      WHERE posts.id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching post by ID:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url, category, clerk_user_id } = req.body;

  try {
    // Check if user exists
    const userResult = await pool.query(
      "SELECT id FROM users WHERE clerk_user_id = $1",
      [clerk_user_id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user_id = userResult.rows[0].id;

    // Check if post exists and belongs to user
    const postResult = await pool.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const post = postResult.rows[0];
    if (post.user_id !== user_id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update post
    const updatedPost = await pool.query(
      "UPDATE posts SET title = $1, content = $2, image_url = $3, category = $4, updated_at = NOW() WHERE id = $5 RETURNING *",
      [title, content, image_url, category, id]
    );

    res.status(200).json(updatedPost.rows[0]);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getPostsByUser = async (req, res) => {
  const { clerk_user_id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT posts.*, users.first_name, users.last_name, users.clerk_user_id as author_clerk_id
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      WHERE users.clerk_user_id = $1
      ORDER BY posts.created_at DESC
    `,
      [clerk_user_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching posts by user:", err);
    res.status(500).json({ error: "Server error" });
  }
};
