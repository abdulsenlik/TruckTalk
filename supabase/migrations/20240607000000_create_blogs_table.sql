-- Create blogs table for TruckTalk blog system
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'TruckTalk Team',
  published_at TIMESTAMP WITH TIME ZONE,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_blogs_status_published_at ON blogs(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON blogs USING GIN(tags);

-- Enable realtime for blogs table
ALTER PUBLICATION supabase_realtime ADD TABLE blogs;

-- Insert sample blog posts for testing
INSERT INTO blogs (slug, title, summary, content, cover_image, author, published_at, tags, status) VALUES
(
  'mastering-traffic-stops-essential-english-phrases',
  'Mastering Traffic Stops: Essential English Phrases for Truck Drivers',
  'Learn the most important English phrases and vocabulary you need to communicate effectively with police officers during traffic stops.',
  '# Mastering Traffic Stops: Essential English Phrases for Truck Drivers

As a truck driver in America, knowing how to communicate effectively during traffic stops is crucial for your safety and professional success. This comprehensive guide will teach you the essential English phrases and proper etiquette for these interactions.

## Before the Stop: Preparation is Key

When you see police lights behind you:
- **"I will pull over to the shoulder safely"**
- **"Let me turn on my hazard lights"**
- **"I need to find a safe place to stop"**

## Initial Contact: First Impressions Matter

### Greeting the Officer
- **"Good morning/afternoon, officer"**
- **"How can I help you today?"**
- **"Is there a problem, officer?"**

### Showing Respect
- Always address them as "officer," "sir," or "ma''am"
- Keep your hands visible on the steering wheel
- Wait for instructions before reaching for documents

## Document Requests: Be Prepared

### When Asked for Documents
- **"Here is my commercial driver''s license"**
- **"My insurance card is in the glove box"**
- **"May I reach for my registration?"**
- **"All my documents are current and valid"**

### If You Need to Explain
- **"My medical certificate is attached to my CDL"**
- **"I have my logbook right here"**
- **"Everything is up to date, officer"**

## Common Questions and Responses

### About Your Trip
- **"I am delivering cargo to [destination]"**
- **"This is a business trip for my company"**
- **"I am transporting [type of cargo]"**

### About Speed or Violations
- **"I apologize if I was speeding, officer"**
- **"I was trying to keep up with traffic"**
- **"I will be more careful with the speed limit"**

## Emergency Situations

### Reporting Problems
- **"I need to report an accident"**
- **"There is a safety hazard on the road"**
- **"I witnessed a collision"**

### Asking for Help
- **"Could you please repeat that?"**
- **"I don''t understand. Could you explain?"**
- **"My English is not perfect. Please speak slowly"**

## Professional Closing

### Ending the Interaction
- **"Thank you for your patience, officer"**
- **"I understand. Have a safe day"**
- **"Thank you for the warning"**
- **"I will drive more carefully"**

## Key Tips for Success

1. **Stay Calm**: Keep your voice steady and respectful
2. **Be Honest**: Don''t lie or make excuses
3. **Listen Carefully**: Make sure you understand instructions
4. **Ask Questions**: If you''re confused, it''s okay to ask for clarification
5. **Show Respect**: Professional behavior goes a long way

## Practice Makes Perfect

The best way to improve your English for traffic stops is through practice. Use these phrases in everyday conversations, and consider taking English classes specifically designed for professional drivers.

Remember: Good communication skills not only help during traffic stops but also make you a more successful and confident truck driver overall.

---

*Want to practice these phrases with interactive lessons? Check out our [Traffic Stop Course](/modules) for hands-on learning with real scenarios.*',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  'TruckTalk Team',
  NOW() - INTERVAL '2 days',
  ARRAY['traffic-stops', 'english-phrases', 'communication', 'safety'],
  'published'
),
(
  'understanding-dot-regulations-for-international-drivers',
  'Understanding DOT Regulations: A Guide for International Drivers',
  'Navigate US Department of Transportation regulations with confidence. Essential knowledge for international truck drivers working in America.',
  '# Understanding DOT Regulations: A Guide for International Drivers

Working as a truck driver in the United States means understanding and following Department of Transportation (DOT) regulations. For international drivers, these rules can seem complex, but this guide will help you navigate them successfully.

## What is the DOT?

The Department of Transportation (DOT) is the US government agency responsible for:
- Highway safety regulations
- Commercial vehicle standards
- Driver qualification requirements
- Hours of service rules

## Essential DOT Requirements

### Commercial Driver''s License (CDL)
- Must have a valid US CDL to operate commercial vehicles
- Different classes: Class A, B, and C
- Special endorsements for hazardous materials, passengers, etc.

### Medical Certification
- Required medical exam every 2 years (or 1 year for certain conditions)
- Must carry medical certificate while driving
- Certain medical conditions may disqualify drivers

### Hours of Service (HOS) Rules

#### Driving Time Limits
- **11-hour driving limit**: Maximum 11 hours of driving after 10 consecutive hours off duty
- **14-hour limit**: Cannot drive beyond 14th consecutive hour after coming on duty
- **60/70-hour limit**: Cannot drive after 60/70 hours on duty in 7/8 consecutive days

#### Required Rest Periods
- **10-hour break**: Must take at least 10 consecutive hours off duty before driving
- **30-minute break**: Required after 8 hours of driving time

### Electronic Logging Devices (ELD)
- Most commercial drivers must use ELDs to track hours
- Automatically records driving time and duty status
- Must know how to operate and explain ELD data to officers

## Vehicle Inspection Requirements

### Pre-Trip Inspection
- Required before each trip
- Must check brakes, lights, tires, and other safety equipment
- Document any defects found

### Post-Trip Inspection
- Required at end of each day
- Report any defects or damage
- Ensure vehicle is safe for next driver

## Common DOT Violations to Avoid

### Hours of Service Violations
- Driving beyond allowed hours
- Insufficient rest periods
- Incorrect logbook entries

### Vehicle Maintenance Issues
- Faulty brakes or lights
- Worn tires
- Missing safety equipment

### Documentation Problems
- Expired medical certificate
- Incomplete logbooks
- Missing vehicle registration

## Tips for DOT Compliance

### Stay Organized
- Keep all documents current and easily accessible
- Maintain accurate records
- Plan trips to comply with HOS rules

### Regular Maintenance
- Follow vehicle maintenance schedules
- Address problems immediately
- Keep maintenance records

### Know Your Rights
- You can refuse unsafe dispatch orders
- You have the right to adequate rest
- You can request clarification during inspections

## Dealing with DOT Inspections

### Types of Inspections
- **Level 1**: Complete vehicle and driver inspection
- **Level 2**: Walk-around vehicle inspection
- **Level 3**: Driver credentials and administrative inspection

### During an Inspection
- Remain calm and professional
- Provide requested documents promptly
- Answer questions honestly
- Don''t argue with inspectors

## Resources for International Drivers

### Getting Help
- Contact your employer''s safety department
- Consult with experienced drivers
- Take DOT compliance courses
- Use official DOT resources and websites

### Staying Updated
- Regulations can change
- Subscribe to industry newsletters
- Attend safety meetings
- Take refresher courses

## Conclusion

Understanding DOT regulations is essential for success as a commercial driver in the US. While the rules may seem overwhelming at first, following them protects you, other drivers, and your career.

Remember: When in doubt, ask questions. It''s better to seek clarification than to risk violations that could affect your driving record and employment.

---

*Need help understanding specific DOT requirements? Our [Professional Development modules](/modules) include detailed lessons on regulations and compliance.*',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  'Safety Expert',
  NOW() - INTERVAL '5 days',
  ARRAY['dot-regulations', 'compliance', 'safety', 'professional-development'],
  'published'
),
(
  'english-for-truck-drivers-common-mistakes-to-avoid',
  'English for Truck Drivers: Common Mistakes to Avoid',
  'Improve your professional English by learning about the most common mistakes truck drivers make and how to avoid them.',
  '# English for Truck Drivers: Common Mistakes to Avoid

As an international truck driver working in the United States, strong English communication skills are essential for your success and safety. This guide highlights the most common English mistakes truck drivers make and provides practical solutions.

## Grammar Mistakes That Matter

### 1. Mixing Up "A" and "An"

**Wrong**: "I need a ELD for my truck"
**Right**: "I need an ELD for my truck"

**Rule**: Use "an" before words that start with vowel sounds (a, e, i, o, u)

### 2. Incorrect Verb Tenses

**Wrong**: "I am drive to Chicago yesterday"
**Right**: "I drove to Chicago yesterday"

**Tip**: Past actions use past tense verbs

### 3. Subject-Verb Agreement

**Wrong**: "The brakes is working fine"
**Right**: "The brakes are working fine"

**Rule**: Plural subjects need plural verbs

## Pronunciation Challenges

### Common Mispronunciations

| Word | Wrong | Right | Tip |
|------|-------|-------| ----|
| Vehicle | "VEE-hick-el" | "VEE-ih-kul" | Three syllables |
| License | "LIE-sense" | "LIE-suhns" | Silent ''c'' |
| Registration | "Reg-is-TRAY-shun" | "rej-uh-STRAY-shuhn" | Four syllables |
| Officer | "OFF-ik-er" | "AW-fi-ser" | Soft ''c'' sound |

### Practice Tip
Record yourself saying these words and compare with online pronunciation guides.

## Professional Communication Errors

### 1. Being Too Casual

**Wrong**: "Hey, what''s up?" (to a police officer)
**Right**: "Good morning, officer. How can I help you?"

### 2. Using Slang or Informal Language

**Wrong**: "My truck''s busted"
**Right**: "My truck has a mechanical problem"

### 3. Not Being Specific Enough

**Wrong**: "Something''s wrong with the truck"
**Right**: "The brake lights are not working"

## Radio Communication Mistakes

### CB Radio Etiquette

**Wrong**: Speaking too fast or using unclear language
**Right**: Speaking slowly and clearly

**Example**:
- **Wrong**: "Breaker19thisisbigrigheadingeastbound"
- **Right**: "Breaker 1-9, this is Big Rig heading eastbound"

### Dispatch Communication

**Wrong**: "I can''t make it" (without explanation)
**Right**: "I''m running 30 minutes late due to heavy traffic on I-95"

## Documentation and Paperwork Errors

### Common Writing Mistakes

1. **Incomplete Information**
   - Always fill out all required fields
   - Double-check dates and times
   - Sign and date documents

2. **Illegible Handwriting**
   - Write clearly and neatly
   - Use block letters if necessary
   - Ask for help if unsure about spelling

## Emergency Communication Mistakes

### What NOT to Say

**Wrong**: "There''s a big mess on the highway"
**Right**: "There''s a multi-vehicle accident at mile marker 45 on I-75 northbound"

### Key Information to Include
- Exact location (mile markers, exit numbers)
- Type of emergency
- Number of vehicles involved
- Whether anyone appears injured

## Cultural Communication Differences

### Understanding American Directness

**In some cultures**: Indirect communication is polite
**In American business**: Direct, clear communication is preferred

**Example**:
- **Indirect**: "Maybe there might be a small issue with the delivery"
- **Direct**: "The delivery will be 2 hours late due to a flat tire"

### Eye Contact and Body Language
- Make appropriate eye contact when speaking
- Stand or sit up straight
- Avoid crossing arms (can seem defensive)

## Technology-Related Communication

### GPS and Navigation

**Wrong**: "The GPS is broken"
**Right**: "The GPS is not receiving a signal" or "The GPS gave incorrect directions"

### ELD Communication

**Wrong**: "The computer thing isn''t working"
**Right**: "The ELD is showing an error message" or "The ELD won''t connect"

## Improvement Strategies

### Daily Practice Tips

1. **Listen to English Radio**: Tune into news or talk radio during breaks
2. **Practice with Colleagues**: Ask English-speaking drivers to help you practice
3. **Use Language Apps**: Spend 15 minutes daily on English learning apps
4. **Read Road Signs Aloud**: Practice pronunciation while driving

### Professional Development

1. **Take ESL Classes**: Many community colleges offer classes for working adults
2. **Join Driver Groups**: Participate in online forums and local driver meetups
3. **Watch Educational Videos**: YouTube has many channels for English learners

### Building Confidence

1. **Start Small**: Practice with simple, everyday conversations
2. **Don''t Fear Mistakes**: Everyone makes mistakes while learning
3. **Ask for Clarification**: It''s okay to say "Could you repeat that?"
4. **Prepare Common Phrases**: Memorize key phrases for different situations

## Resources for Continued Learning

### Free Online Resources
- Duolingo (language learning app)
- BBC Learning English
- Voice of America Learning English
- YouTube English learning channels

### Professional Resources
- Local community college ESL programs
- Trucking company training programs
- Professional English tutors
- Industry-specific English courses

## Conclusion

Improving your English takes time and practice, but the investment pays off in better job opportunities, safer driving experiences, and increased confidence on the road.

Remember: Every professional driver started somewhere. The key is consistent practice and not being afraid to make mistakes while learning.

---

*Ready to practice your English skills? Try our interactive [Communication Modules](/modules) designed specifically for truck drivers.*',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
  'Language Instructor',
  NOW() - INTERVAL '1 week',
  ARRAY['english-learning', 'communication', 'professional-development', 'mistakes'],
  'published'
);
