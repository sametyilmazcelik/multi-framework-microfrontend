-- Enable Row Level Security on all tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create SELECT-only policies for public read access
-- Profile table
CREATE POLICY "Allow public read access on profile"
ON profile
FOR SELECT
TO public
USING (true);

-- Experiences table
CREATE POLICY "Allow public read access on experiences"
ON experiences
FOR SELECT
TO public
USING (true);

-- Projects table
CREATE POLICY "Allow public read access on projects"
ON projects
FOR SELECT
TO public
USING (true);

-- Skills table
CREATE POLICY "Allow public read access on skills"
ON skills
FOR SELECT
TO public
USING (true);

-- Education table
CREATE POLICY "Allow public read access on education"
ON education
FOR SELECT
TO public
USING (true);

-- Certificates table
CREATE POLICY "Allow public read access on certificates"
ON certificates
FOR SELECT
TO public
USING (true);

