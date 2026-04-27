-- RSE Platform Database Seed (SQL Version)
-- Run this directly in your PostgreSQL database

-- First, check if data already exists to avoid duplicates
DO $$
BEGIN
  -- Only seed if securities table is empty
  IF NOT EXISTS (SELECT 1 FROM security LIMIT 1) THEN
    
    -- Insert Securities
    INSERT INTO security (id, ticker, "companyName", isin, type, sector, "currentPrice", "previousClose", "openPrice", "highPrice", "lowPrice", "sharesOutstanding", "marketCap", "dividendYield", volume, currency, description, status, "createdAt", "updatedAt")
    VALUES 
      (gen_random_uuid(), 'BK', 'Bank of Kigali Group PLC', 'RW000A1H63L5', 'EQUITY', 'Banking', 328.00, 325.00, 326.00, 330.00, 324.00, 534000000, 175152000000, 3.05, 45230, 'RWF', 'Bank of Kigali is the largest bank in Rwanda by assets.', 'ACTIVE', NOW(), NOW()),
      (gen_random_uuid(), 'MTN', 'MTN Rwanda PLC', 'RW000A2YDS77', 'EQUITY', 'Telecommunications', 180.00, 178.00, 179.00, 182.00, 177.00, 2000000000, 360000000000, 4.44, 120500, 'RWF', 'MTN Rwanda is the leading mobile telecommunications provider.', 'ACTIVE', NOW(), NOW()),
      (gen_random_uuid(), 'BRALIRWA', 'Bralirwa PLC', 'RW000A0ZKHY4', 'EQUITY', 'Consumer Goods', 165.00, 163.00, 164.00, 167.00, 162.00, 378000000, 62370000000, 5.00, 32100, 'RWF', 'Rwanda leading beverage company.', 'ACTIVE', NOW(), NOW());
    
    RAISE NOTICE 'Securities seeded successfully';
  ELSE
    RAISE NOTICE 'Securities already exist, skipping seed';
  END IF;
END $$;
