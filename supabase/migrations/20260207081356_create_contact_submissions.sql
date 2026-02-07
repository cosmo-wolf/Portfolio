/*
  # Contact Form Submissions

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Name of the person submitting the form
      - `email` (text) - Email address of the submitter
      - `message` (text) - The message content
      - `created_at` (timestamptz) - Timestamp when the submission was created
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for inserting submissions (public access for form submission)
    - Add policy for viewing submissions (authenticated users only)

  3. Notes
    - This table stores all contact form submissions from the portfolio
    - Public users can submit forms without authentication
    - Only authenticated admin users can view submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);