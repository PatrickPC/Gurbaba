-- Add images array column to support multiple images per article
-- First rename the old image column to images and change its type
ALTER TABLE news_articles 
  RENAME COLUMN image TO images;

-- Change the column type to text array
ALTER TABLE news_articles 
  ALTER COLUMN images TYPE text[] USING 
    CASE 
      WHEN images IS NULL THEN NULL
      WHEN images = '' THEN NULL
      ELSE ARRAY[images]
    END;

-- Set default to empty array for new entries
ALTER TABLE news_articles 
  ALTER COLUMN images SET DEFAULT '{}';