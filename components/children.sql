CREATE TABLE children (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,


  -- Card Box 1 create a card box with a demo placeholder to let some information for parents to know how we use this data
  
  -- Card Box 2 Basic Information
  childrenname VARCHAR(100) NOT NULL,    
  nickname VARCHAR(50) default 'Nickname',
  age INT,
  gender VARCHAR(10) default 'Male', --for Dropdown Box: Male, Female, Diverse, Prefer Not to Say
  

  -- Card Box 3 Contact Information
  email VARCHAR(254) UNIQUE NOT NULL,
  phone VARCHAR(20),
  
  -- card box 4 - Medical Information
  medical_has_allergies BOOLEAN DEFAULT false,
  medical_has_mental_disorders BOOLEAN DEFAULT false,
  medical_has_physical_disorders BOOLEAN DEFAULT false,  

  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)

);