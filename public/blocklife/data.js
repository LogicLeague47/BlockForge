/* BlockLife content database (ES5). Full BitLife energy. */
var BLD = {};

BLD.countries = [
  { name: 'United States', cur: '$', cities: ['Miami', 'Tucson', 'Newark', 'Fresno'],
    male: ['Jake', 'Mason', 'Ethan', 'Liam', 'Noah', 'Lucas', 'Aiden', 'Carter', 'Wyatt', 'Grayson', 'Colt', 'Beau'],
    female: ['Emma', 'Olivia', 'Ava', 'Sophia', 'Mia', 'Harper', 'Luna', 'Stella', 'Ruby', 'Willow', 'Dixie', 'Sadie'],
    last: ['Ryder', 'Stone', 'Grady', 'Boone', 'Cash', 'Duke', 'Reed', 'Knox', 'Pierce', 'Vaughn', 'Slade', 'Riggs', 'Holt', 'Frost', 'Steele', 'Wolf'] },
  { name: 'United Kingdom', cur: 'GBP', cities: ['London', 'Leeds', 'Glasgow', 'Cardiff'],
    male: ['Oliver', 'George', 'Harry', 'Jack', 'Charlie', 'Alfie', 'Freddie', 'Archie', 'Teddy', 'Louie', 'Ronnie', 'Bobby'],
    female: ['Amelia', 'Isla', 'Poppy', 'Freya', 'Daisy', 'Ruby', 'Evie', 'Millie', 'Elsie', 'Florence', 'Mabel', 'Dotty'],
    last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Johnson', 'Roberts', 'Walker', 'Wright', 'Thompson', 'White', 'Hughes', 'Edwards'] },
  { name: 'Canada', cur: '$', cities: ['Toronto', 'Calgary', 'Halifax', 'Winnipeg'],
    male: ['Liam', 'Noah', 'William', 'James', 'Logan', 'Owen', 'Caleb', 'Nathan', 'Hunter', 'Cohen', 'Jasper', 'Milo'],
    female: ['Olivia', 'Emma', 'Charlotte', 'Sophia', 'Ava', 'Chloe', 'Zoey', 'Lily', 'Nora', 'Hazel', 'Violet', 'Aurora'],
    last: ['Tremblay', 'Gagnon', 'Roy', 'Cote', 'Bouchard', 'Gauthier', 'Morin', 'Lavoie', 'Fortin', 'Leblanc', 'Bergeron', 'Dube', 'Li', 'Singh', 'Chen', 'Khan'] },
  { name: 'Australia', cur: '$', cities: ['Sydney', 'Perth', 'Brisbane', 'Adelaide'],
    male: ['Oliver', 'Jack', 'Noah', 'William', 'Leo', 'Lucas', 'Henry', 'Harvey', 'Archie', 'Banjo', 'Ned', 'Rusty'],
    female: ['Charlotte', 'Olivia', 'Ruby', 'Matilda', 'Harper', 'Willow', 'Isla', 'Evie', 'Poppy', 'Sadie', 'Tilly', 'Bonnie'],
    last: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson', 'Thompson', 'Nguyen', 'Walker', 'Harris', 'Lee', 'Ryan'] },
  { name: 'Japan', cur: 'Y', cities: ['Tokyo', 'Osaka', 'Fukuoka', 'Sapporo'],
    male: ['Ren', 'Hayato', 'Haruto', 'Sota', 'Yuto', 'Riku', 'Kaito', 'Daiki', 'Sho', 'Renji', 'Takeshi', 'Kenji'],
    female: ['Hina', 'Yui', 'Mio', 'Sakura', 'Aoi', 'Rin', 'Mei', 'Nana', 'Koharu', 'Emi', 'Yuki', 'Airi'],
    last: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Ito', 'Kato', 'Yoshida', 'Yamada', 'Sasaki', 'Yamaguchi', 'Matsumoto', 'Inoue'] },
  { name: 'Brazil', cur: 'R$', cities: ['Sao Paulo', 'Salvador', 'Fortaleza', 'Manaus'],
    male: ['Miguel', 'Arthur', 'Gael', 'Theo', 'Davi', 'Bernardo', 'Gabriel', 'Pedro', 'Enzo', 'Rafael', 'Caio', 'Lucas'],
    female: ['Alice', 'Laura', 'Manuela', 'Valentina', 'Sophia', 'Isabella', 'Heloisa', 'Luiza', 'Julia', 'Beatriz', 'Mariana', 'Camila'],
    last: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Costa', 'Pereira', 'Almeida', 'Carvalho', 'Ferreira', 'Rodrigues', 'Gomes', 'Martins', 'Araujo', 'Melo', 'Barbosa', 'Cardoso'] }
];

BLD.jobs = [
  { id: 'busser', title: 'Busser', track: 'food', salary: 18000, req: {} },
  { id: 'waiter', title: 'Waiter', track: 'food', salary: 26000, req: {} },
  { id: 'bartender', title: 'Bartender', track: 'food', salary: 34000, req: { loo: 40 } },
  { id: 'chef', title: 'Head Chef', track: 'food', salary: 58000, req: { sma: 40 } },
  { id: 'exec_chef', title: 'Executive Chef', track: 'food', salary: 95000, req: { sma: 60 } },
  { id: 'cashier', title: 'Cashier', track: 'retail', salary: 19000, req: {} },
  { id: 'clerk', title: 'Sales Clerk', track: 'retail', salary: 25000, req: {} },
  { id: 'store_mgr', title: 'Store Manager', track: 'retail', salary: 48000, req: { sma: 40 } },
  { id: 'regional_mgr', title: 'Regional Manager', track: 'retail', salary: 85000, req: { sma: 60 } },
  { id: 'dishwasher', title: 'Dishwasher', track: 'odd', salary: 17000, req: {} },
  { id: 'bouncer', title: 'Bouncer', track: 'odd', salary: 30000, req: { hea: 60 } },
  { id: 'stripper', title: 'Exotic Dancer', track: 'odd', salary: 55000, req: { loo: 80 } },
  { id: 'hitman', title: 'Contract Killer', track: 'odd', salary: 120000, req: { hea: 50 }, shady: true },
  { id: 'apprentice', title: 'Apprentice', track: 'trade', salary: 24000, req: {} },
  { id: 'electrician', title: 'Electrician', track: 'trade', salary: 52000, req: { sma: 30 } },
  { id: 'plumber', title: 'Master Plumber', track: 'trade', salary: 60000, req: { sma: 30 } },
  { id: 'contractor', title: 'Contractor', track: 'trade', salary: 88000, req: { sma: 50 } },
  { id: 'foreman', title: 'Foreman', track: 'trade', salary: 72000, req: { sma: 40 } },
  { id: 'intern', title: 'Office Intern', track: 'office', salary: 22000, req: { edu: 1 } },
  { id: 'assistant', title: 'Assistant', track: 'office', salary: 36000, req: { edu: 1 } },
  { id: 'analyst', title: 'Analyst', track: 'office', salary: 62000, req: { edu: 2, sma: 50 } },
  { id: 'manager', title: 'Manager', track: 'office', salary: 92000, req: { edu: 2, sma: 60 } },
  { id: 'exec', title: 'Executive', track: 'office', salary: 160000, req: { edu: 2, sma: 75 } },
  { id: 'ceo', title: 'CEO', track: 'office', salary: 320000, req: { edu: 2, sma: 85 } },
  { id: 'orderly', title: 'Orderly', track: 'med', salary: 28000, req: { edu: 1 } },
  { id: 'nurse', title: 'Nurse', track: 'med', salary: 68000, req: { edu: 2, sma: 55 } },
  { id: 'paramedic', title: 'Paramedic', track: 'med', salary: 48000, req: { edu: 1, hea: 50 } },
  { id: 'gp', title: 'Doctor', track: 'med', salary: 190000, req: { edu: 3, sma: 80 } },
  { id: 'surgeon', title: 'Brain Surgeon', track: 'med', salary: 380000, req: { edu: 3, sma: 95 } },
  { id: 'paralegal', title: 'Paralegal', track: 'law', salary: 48000, req: { edu: 2 } },
  { id: 'lawyer', title: 'Lawyer', track: 'law', salary: 130000, req: { edu: 3, sma: 75 } },
  { id: 'judge', title: 'Judge', track: 'law', salary: 210000, req: { edu: 3, sma: 90 } },
  { id: 'support', title: 'IT Support', track: 'tech', salary: 45000, req: { edu: 1, sma: 40 } },
  { id: 'qa', title: 'QA Tester', track: 'tech', salary: 58000, req: { edu: 2, sma: 50 } },
  { id: 'dev', title: 'Developer', track: 'tech', salary: 105000, req: { edu: 2, sma: 65 } },
  { id: 'senior_dev', title: 'Senior Developer', track: 'tech', salary: 155000, req: { edu: 2, sma: 80 } },
  { id: 'cto', title: 'CTO', track: 'tech', salary: 290000, req: { edu: 2, sma: 90 } },
  { id: 'roadie', title: 'Roadie', track: 'arts', salary: 24000, req: {} },
  { id: 'dj', title: 'Club DJ', track: 'arts', salary: 42000, req: { loo: 40 } },
  { id: 'model', title: 'Model', track: 'arts', salary: 70000, req: { loo: 85 } },
  { id: 'actor', title: 'Actor', track: 'arts', salary: 95000, req: { loo: 70 } },
  { id: 'popstar', title: 'Pop Star', track: 'arts', salary: 480000, req: { loo: 90 }, fame: 30 },
  { id: 'athlete', title: 'Pro Athlete', track: 'arts', salary: 520000, req: { hea: 90, loo: 60 }, fame: 25 },
  { id: 'writer', title: 'Writer', track: 'arts', salary: 52000, req: { edu: 2, sma: 65 } },
  { id: 'pilot', title: 'Pilot', track: 'pro', salary: 140000, req: { edu: 2, sma: 70, hea: 60 } },
  { id: 'architect', title: 'Architect', track: 'pro', salary: 110000, req: { edu: 3, sma: 70 } },
  { id: 'professor', title: 'Professor', track: 'pro', salary: 98000, req: { edu: 3, sma: 80 } },
  { id: 'scientist', title: 'Scientist', track: 'pro', salary: 125000, req: { edu: 3, sma: 85 } },
  { id: 'priest', title: 'Priest', track: 'pro', salary: 38000, req: { edu: 1 } },
  { id: 'mayor', title: 'Mayor', track: 'pro', salary: 150000, req: { edu: 2, sma: 70, loo: 60 } },
  { id: 'president', title: 'President', track: 'pro', salary: 400000, req: { edu: 2, sma: 85, loo: 70 }, fame: 40 },
  { id: 'soldier', title: 'Soldier', track: 'mil', salary: 32000, req: { hea: 50 } },
  { id: 'sergeant', title: 'Sergeant', track: 'mil', salary: 52000, req: { hea: 60 } },
  { id: 'officer', title: 'Officer', track: 'mil', salary: 88000, req: { edu: 2, hea: 65 } },
  { id: 'general', title: 'General', track: 'mil', salary: 200000, req: { edu: 2, hea: 80 }, fame: 15 },
  { id: 'teacher', title: 'Teacher', track: 'pro', salary: 52000, req: { edu: 2, sma: 55 } },
  { id: 'cop', title: 'Police Officer', track: 'pro', salary: 62000, req: { edu: 1, hea: 55 } },
  { id: 'firefighter', title: 'Firefighter', track: 'pro', salary: 58000, req: { hea: 65 } },
  { id: 'farmer', title: 'Farmer', track: 'trade', salary: 38000, req: {} },
  { id: 'miner', title: 'Miner', track: 'trade', salary: 55000, req: { hea: 60 } },
  { id: 'sailor', title: 'Sailor', track: 'trade', salary: 42000, req: { hea: 50 } }
];

BLD.houses = [
  { id: 'shack', name: 'Meth Shack', price: 22000 },
  { id: 'trailer', name: 'Trailer', price: 45000 },
  { id: 'condo', name: 'Condo', price: 180000 },
  { id: 'house', name: 'Family House', price: 350000 },
  { id: 'mcmansion', name: 'McMansion', price: 950000 },
  { id: 'penthouse', name: 'Penthouse', price: 2400000 },
  { id: 'mansion', name: 'Mansion', price: 6500000 },
  { id: 'castle', name: 'Castle', price: 22000000 },
  { id: 'island', name: 'Private Island', price: 80000000 }
];
BLD.cars = [
  { id: 'beater', name: 'Rust Beater', price: 3000 },
  { id: 'sedan', name: 'Used Sedan', price: 14000 },
  { id: 'suv', name: 'SUV', price: 42000 },
  { id: 'sports', name: 'Sports Car', price: 120000 },
  { id: 'lamb', name: 'Lamborghini', price: 280000 },
  { id: 'yacht', name: 'Yacht', price: 3500000 },
  { id: 'jet', name: 'Private Jet', price: 12000000 }
];
BLD.jewelry = [
  { id: 'ring', name: 'Gold Ring', price: 800 },
  { id: 'watch', name: 'Rolex', price: 12000 },
  { id: 'chain', name: 'Diamond Chain', price: 45000 },
  { id: 'crown', name: 'Jeweled Crown', price: 300000 }
];
BLD.pets = [
  { id: 'dog', name: 'Dog', price: 400 },
  { id: 'cat', name: 'Cat', price: 150 },
  { id: 'parrot', name: 'Parrot', price: 900 },
  { id: 'horse', name: 'Horse', price: 8000 },
  { id: 'snake', name: 'Snake', price: 250 },
  { id: 'tiger', name: 'Tiger (illegal)', price: 20000 }
];

BLD.crimes = [
  { id: 'pickpocket', name: 'Pickpocket', loot: [50, 400], jail: 0.12, years: [0, 1] },
  { id: 'shoplift', name: 'Shoplift', loot: [100, 900], jail: 0.15, years: [0, 1] },
  { id: 'carjack', name: 'Carjack', loot: [2000, 15000], jail: 0.25, years: [1, 3] },
  { id: 'burglary', name: 'Burglary', loot: [3000, 30000], jail: 0.28, years: [1, 4] },
  { id: 'bank', name: 'Bank Robbery', loot: [20000, 250000], jail: 0.45, years: [3, 12] },
  { id: 'mug', name: 'Mug a Jogger', loot: [20, 300], jail: 0.18, years: [0, 2] },
  { id: 'arson', name: 'Arson', loot: [0, 0], jail: 0.35, years: [2, 8] },
  { id: 'murder', name: 'Murder', loot: [0, 0], jail: 0.6, years: [10, 40] }
];

BLD.deaths = [
  { t: 'died peacefully in {hs} sleep', w: 30 },
  { t: 'was hit by a bus while texting', w: 8 },
  { t: 'choked on a chicken wing', w: 8 },
  { t: 'fell off a cruise ship balcony', w: 5 },
  { t: 'was crushed by a vending machine', w: 5 },
  { t: 'died doing something unspeakable with a toaster', w: 4 },
  { t: 'was eaten by {hs} own tiger', w: 3 },
  { t: 'exploded while microwaving fireworks', w: 4 },
  { t: 'drowned in a kiddie pool', w: 4 },
  { t: 'was struck by lightning. Twice. Same day.', w: 3 },
  { t: 'lost a fight with a kangaroo', w: 4 },
  { t: 'ate gas station sushi', w: 7 },
  { t: 'fell into a volcano taking a selfie', w: 3 },
  { t: 'was assassinated by a jealous ex', w: 3 },
  { t: 'overdosed on protein powder', w: 3 },
  { t: 'slipped on a banana peel. Classic.', w: 5 }
];

/* EVENTS. fx(s) mutates via Life helpers, returns log string/array or {log,then}. */
BLD.events = [];
function BLE(e) { BLD.events.push(e); return e; }

BLE({ id: 'born_sibling', min: 0, max: 8, w: 12,
  if: function(s) { return s.siblings.length < 4; },
  t: function(s) { return 'Your parents had another baby. Congratulations, you have competition now.'; },
  ch: [{ t: 'Welcome it', fx: function(s) { Life.sib(s); return 'A baby sibling joined the circus.'; } }] });

BLE({ id: 'kid_cooties', min: 5, max: 9, w: 10,
  t: function(s) { return 'A kid at school says you have cooties and the whole class agrees.'; },
  ch: [
    { t: 'Cry', fx: function(s) { Life.bump(s, 'hap', -8); return 'You cried. It did not help.'; } },
    { t: 'Punch them', fx: function(s) { Life.bump(s, 'hap', 4); Life.bump(s, 'karma', -5); return 'You punched them. Worth it.'; } }
  ] });

BLE({ id: 'kid_lemonade', min: 6, max: 11, w: 9,
  t: function(s) { return 'You set up a lemonade stand and made some cash. Capitalism tastes sweet.'; },
  ch: [{ t: 'Nice', fx: function(s) { Life.cash(s, 120); return null; } }] });

BLE({ id: 'kid_bully', min: 7, max: 13, w: 11,
  t: function(s) { return 'A bully three times your size demands your lunch money every day.'; },
  ch: [
    { t: 'Pay up', fx: function(s) { Life.cash(s, -50); Life.bump(s, 'hap', -5); return 'You paid. Cowardice is affordable.'; } },
    { t: 'Fight back', fx: function(s) {
        if (Life.chance(0.45)) { Life.bump(s, 'hap', 10); Life.bump(s, 'hea', -8); return 'You won the fight and lost a tooth. Legend.'; }
        Life.bump(s, 'hap', -12); Life.bump(s, 'hea', -12); return 'You got folded like laundry in front of everyone.'; } }
  ] });

BLE({ id: 'kid_teacher', min: 6, max: 12, w: 8,
  t: function(s) { return 'Your teacher says you have potential, in the tone adults use right before giving up.'; },
  ch: [{ t: 'Whatever', fx: function(s) { return null; } }] });

BLE({ id: 'kid_dog_bite', min: 4, max: 10, w: 7,
  t: function(s) { return 'The neighbor dog bit your butt. You now fear mailmen by association.'; },
  ch: [{ t: 'Ouch', fx: function(s) { Life.bump(s, 'hea', -6); Life.bump(s, 'hap', -4); return null; } }] });

BLE({ id: 'kid_talent', min: 8, max: 12, w: 7,
  t: function(s) { return 'You won the school talent show doing armpit farts of the national anthem.'; },
  ch: [{ t: 'Encore!', fx: function(s) { Life.bump(s, 'hap', 12); Life.bump(s, 'loo', 2); return null; } }] });

BLE({ id: 'kid_lost', min: 4, max: 8, w: 6,
  t: function(s) { return 'You got lost in a supermarket and a shelf stocker raised you for 20 minutes.'; },
  ch: [{ t: 'Traumatic', fx: function(s) { Life.bump(s, 'hap', -4); return null; } }] });

BLE({ id: 'teen_acne', min: 12, max: 16, w: 12,
  t: function(s) { return 'Puberty hit like a truck. Your face is now 40% volcano.'; },
  ch: [
    { t: 'Pop everything', fx: function(s) { Life.bump(s, 'loo', -6); Life.bump(s, 'hap', 3); return 'So satisfying. So scarring.'; } },
    { t: 'Leave it alone', fx: function(s) { Life.bump(s, 'loo', 2); return 'Discipline. Your pores salute you.'; } }
  ] });

BLE({ id: 'teen_party', min: 14, max: 18, w: 12,
  t: function(s) { return 'You got invited to a party where some older brother bought everything.'; },
  ch: [
    { t: 'Drink', fx: function(s) { Life.bump(s, 'hap', 10); Life.bump(s, 'hea', -8); return 'You drank. You danced. You regret the video.'; } },
    { t: 'Stay sober', fx: function(s) { Life.bump(s, 'sma', 2); return 'You watched everyone else embarrass themselves. Priceless.'; } }
  ] });

BLE({ id: 'teen_crush', min: 12, max: 17, w: 11,
  t: function(s) { return 'You have a crush so intense you forgot how to speak near them.'; },
  ch: [
    { t: 'Confess', fx: function(s) {
        if (Life.chance(0.4 + Life.get(s, 'loo') / 300)) { Life.bump(s, 'hap', 15); return 'They said yes! Young love blooms.'; }
        Life.bump(s, 'hap', -12); return 'They laughed. Not with you. At you.'; } },
    { t: 'Suffer silently', fx: function(s) { Life.bump(s, 'hap', -4); return 'You pined beautifully from across the cafeteria.'; } }
  ] });

BLE({ id: 'teen_exam', min: 14, max: 18, w: 10,
  if: function(s) { return s.edu.level >= 1; },
  t: function(s) { return 'Final exams. You studied all night. Probably.'; },
  ch: [{ t: 'Take them', fx: function(s) {
      var g = Math.round(Life.rnd() * 40 + Life.get(s, 'sma') * 0.6);
      Life.grade(s, g);
      return g >= 70 ? 'You passed with ' + g + '%. Nerd.' : 'You scored ' + g + '%. Your parents are pretending to be fine.'; } }] });

BLE({ id: 'teen_job', min: 14, max: 17, w: 9,
  t: function(s) { return 'A fast food joint will hire you to mop things. Things you do not want to know about.'; },
  ch: [
    { t: 'Take the job', fx: function(s) { Life.setJob(s, 'cashier'); return 'You are now management-adjacent (cashier).'; } },
    { t: 'Pass', fx: function(s) { return null; } }
  ] });

BLE({ id: 'teen_vape', min: 13, max: 17, w: 8,
  t: function(s) { return 'Everyone behind the gym is vaping something blue-raspberry.'; },
  ch: [
    { t: 'Join in', fx: function(s) { Life.bump(s, 'hap', 6); Life.bump(s, 'hea', -10); return 'Blue-raspberry regret.'; } },
    { t: 'Narc', fx: function(s) { Life.bump(s, 'karma', -8); return 'You told. Everyone knows it was you.'; } }
  ] });

BLE({ id: 'teen_car', min: 16, max: 18, w: 9,
  t: function(s) { return 'You can legally drive now. The roads should be terrified.'; },
  ch: [{ t: 'Freedom!', fx: function(s) { Life.bump(s, 'hap', 10); return null; } }] });

BLE({ id: 'teen_tattoo', min: 15, max: 19, w: 8,
  t: function(s) { return 'A friend of a friend does stick-and-poke tattoos in a garage.'; },
  ch: [
    { t: 'Get one', fx: function(s) { Life.bump(s, 'loo', -4); Life.bump(s, 'hap', 6); return 'It says MUM but spelled wrong. Forever.'; } },
    { t: 'Hard pass', fx: function(s) { return null; } }
  ] });

BLE({ id: 'teen_gossip', min: 12, max: 17, w: 7,
  t: function(s) { return 'Someone started a rumor that you lick light switches.'; },
  ch: [
    { t: 'Start a worse rumor', fx: function(s) { Life.bump(s, 'karma', -6); Life.bump(s, 'hap', 5); return 'Mutually assured gossip.'; } },
    { t: 'Rise above', fx: function(s) { Life.bump(s, 'karma', 4); return 'Dignity intact. Switches unloved.'; } }
  ] });

BLE({ id: 'uni_offer', min: 18, max: 18, w: 20,
  if: function(s) { return s.edu.level === 1 && !s.edu.dropped; },
  t: function(s) { return 'University letters arrived. Tuition is highway robbery.'; },
  ch: [
    { t: 'Enroll (debt!)', fx: function(s) { Life.cash(s, -40000); s.edu.level = 2; return 'You are now educated and poor.'; } },
    { t: 'Skip it', fx: function(s) { return 'School of hard knocks it is.'; } }
  ] });

BLE({ id: 'uni_party2', min: 18, max: 22, w: 10,
  if: function(s) { return s.edu.level >= 2; },
  t: function(s) { return 'Frat party. Someone spiked the punch with extra punch.'; },
  ch: [
    { t: 'Rage', fx: function(s) { Life.bump(s, 'hap', 12); Life.bump(s, 'hea', -10); Life.bump(s, 'sma', -3); return 'GPA damage: critical.'; } },
    { t: 'Study instead', fx: function(s) { Life.bump(s, 'sma', 4); return 'Dean list material. Zero stories.'; } }
  ] });

BLE({ id: 'adult_rent', min: 18, max: 24, w: 10,
  t: function(s) { return 'Rent is due and your fridge contains mustard and regret.'; },
  ch: [
    { t: 'Pay it', fx: function(s) { Life.cash(s, -9000); return 'Shelter: maintained.'; } },
    { t: 'Move back home', fx: function(s) { Life.bump(s, 'hap', -10); return 'Your childhood bedroom smells like defeat.'; } }
  ] });

/* __PART2__ */
BLE({ id: 'love_cheat_catch', min: 18, max: 70, w: 8,
  if: function(s) { return !!s.partner; },
  t: function(s) { return 'You found texts on their phone that were definitely not about plumbing.'; },
  ch: [
    { t: 'Confront', fx: function(s) { Life.bump(s, 'hap', -15); return 'Screaming match. The neighbors learned new words.'; } },
    { t: 'Cheat back', fx: function(s) { Life.bump(s, 'hap', 6); Life.bump(s, 'karma', -10); return 'Revenge is a dish best served shirtless.'; } },
    { t: 'Dump them', fx: function(s) { Life.bump(s, 'hap', -8); Life.dumpPartner(s); return 'Single again. The streets missed you.'; } }
  ] });

BLE({ id: 'love_propose', min: 20, max: 70, w: 7,
  if: function(s) { return !!s.partner && !s.partner.married && s.partner.years >= 2; },
  t: function(s) { return 'You have been together years. A ring feels inevitable. Or terrifying.'; },
  ch: [
    { t: 'Propose', fx: function(s) {
        if (Life.chance(0.6 + Life.get(s, 'loo') / 500)) { s.partner.married = true; Life.bump(s, 'hap', 20); return 'They said yes! Wedding industrial complex: engaged.'; }
        Life.bump(s, 'hap', -15); Life.dumpPartner(s); return 'They said no and left. Bold strategy.'; } },
    { t: 'Never', fx: function(s) { return 'Commitment issues: preserved.'; } }
  ] });

BLE({ id: 'love_baby', min: 20, max: 45, w: 9,
  if: function(s) { return !!s.partner && s.children.length < 5; },
  t: function(s) { return 'Your partner wants a baby. A whole human. From scratch.'; },
  ch: [
    { t: 'Do it', fx: function(s) {
        if (Life.chance(0.7)) { Life.baby(s); Life.bump(s, 'hap', 12); return 'A baby! It screams like a tiny CEO.'; }
        return 'No luck this year. Practice was fun though.'; } },
    { t: 'No way', fx: function(s) { Life.bump(s, 'hap', -6); return 'The argument lasted three days.'; } }
  ] });

BLE({ id: 'love_hookup', min: 18, max: 60, w: 9,
  if: function(s) { return !s.partner; },
  t: function(s) { return 'A stranger winked at you from across the bar. Subtle as a brick.'; },
  ch: [
    { t: 'Go home together', fx: function(s) {
        if (Life.chance(0.5 + Life.get(s, 'loo') / 300)) { Life.bump(s, 'hap', 10); return 'No names exchanged. No regrets filed.'; }
        Life.bump(s, 'hap', -5); return 'Rejected. The walk home felt very long.'; } },
    { t: 'Decline', fx: function(s) { Life.bump(s, 'karma', 2); return null; } }
  ] });

BLE({ id: 'love_ex', min: 20, max: 65, w: 7,
  if: function(s) { return s.exes > 0 && !s.partner; },
  t: function(s) { return 'Your ex texted "u up?" at 2am. Nothing good ever followed those words.'; },
  ch: [
    { t: 'Reply', fx: function(s) { Life.bump(s, 'hap', 5); Life.bump(s, 'karma', -3); return 'You know exactly how this ends. Again.'; } },
    { t: 'Block', fx: function(s) { Life.bump(s, 'hap', 3); return 'Growth.'; } }
  ] });

BLE({ id: 'money_raise', min: 18, max: 65, w: 9,
  if: function(s) { return !!s.job; },
  t: function(s) { return 'Your boss called you into the office. Raise or unemployment with extra steps.'; },
  ch: [{ t: 'Go in', fx: function(s) {
      if (Life.chance(0.4 + (s.job.perf || 0) / 300)) { Life.raise(s); return 'Raise secured! Expensive cheese tonight.'; }
      Life.bump(s, 'hap', -6); return 'No raise. The cheese remains a dream.'; } }] });

BLE({ id: 'money_fired', min: 18, max: 65, w: 6,
  if: function(s) { return !!s.job && (s.job.perf || 50) < 25; },
  t: function(s) { return 'HR wants to "have a chat". HR chats are firings with snacks.'; },
  ch: [{ t: 'Take the box', fx: function(s) { Life.fire(s); return 'You carried your desk plant out like a trophy.'; } }] });
/* __PART3__ */
BLE({ id: 'money_found', min: 10, max: 80, w: 8,
  t: function(s) { return 'You found a wallet with cash and no ID. Finders keepers?'; },
  ch: [
    { t: 'Keep it', fx: function(s) { var n = 100 + Math.floor(Life.rnd() * 900); Life.cash(s, n); Life.bump(s, 'karma', -6); return 'Kept it. Karma noted your address.'; } },
    { t: 'Turn it in', fx: function(s) { Life.bump(s, 'karma', 8); Life.bump(s, 'hap', 3); return 'Good deed. Zero dollars. Rich in spirit.'; } }
  ] });

BLE({ id: 'money_scam', min: 18, max: 70, w: 8,
  if: function(s) { return s.money > 5000; },
  t: function(s) { return 'A prince emailed about an inheritance. He just needs your bank details and trust.'; },
  ch: [
    { t: 'Send money', fx: function(s) { Life.cash(s, -Math.min(s.money, 5000)); Life.bump(s, 'sma', -2); return 'The prince left the chat. With your money.'; } },
    { t: 'Delete', fx: function(s) { Life.bump(s, 'sma', 1); return 'Scam dodged like a responsible adult.'; } }
  ] });

BLE({ id: 'money_crypto', min: 18, max: 60, w: 7,
  if: function(s) { return s.money > 2000; },
  t: function(s) { return 'Your cousin swears MoonCoin is going to the moon. It is currently in a ditch.'; },
  ch: [
    { t: 'Invest $1000', fx: function(s) {
        if (Life.chance(0.3)) { Life.cash(s, 9000); return 'MOON! You sold at the top. Genius. (Luck.)'; }
        Life.cash(s, -1000); return 'Rug pulled. Your cousin left the country.'; } },
    { t: 'Hard pass', fx: function(s) { return null; } }
  ] });

BLE({ id: 'crime_offer', min: 14, max: 60, w: 9,
  t: function(s) { return 'A guy in a parking garage offered "a job, no questions". The questions are the fun part.'; },
  ch: [
    { t: 'Steal a car', fx: function(s) { return Life.doCrime(s, 'carjack'); } },
    { t: 'Walk away', fx: function(s) { Life.bump(s, 'karma', 3); return null; } }
  ] });

BLE({ id: 'crime_snitch', min: 14, max: 70, w: 6,
  if: function(s) { return s.record > 0; },
  t: function(s) { return 'Cops picked you up and offered a deal for names. Any names. They are not picky.'; },
  ch: [
    { t: 'Snitch', fx: function(s) { Life.bump(s, 'karma', -12); s.record = Math.max(0, s.record - 1); return 'You sang like a canary. The streets will remember.'; } },
    { t: 'Stay solid', fx: function(s) { Life.bump(s, 'karma', 5); return 'No snitching. Respect +5.'; } }
  ] });

BLE({ id: 'health_flu', min: 5, max: 90, w: 9,
  t: function(s) { return 'You caught something nasty. Your nose is now a faucet.'; },
  ch: [{ t: 'Suffer', fx: function(s) { Life.bump(s, 'hea', -8); Life.bump(s, 'hap', -5); return null; } }] });

BLE({ id: 'health_gym_injury', min: 16, max: 70, w: 7,
  t: function(s) { return 'You tried to impress someone at the gym by lifting with your ego.'; },
  ch: [{ t: 'Ow', fx: function(s) { Life.bump(s, 'hea', -10); return 'Something popped. It was not popcorn.'; } }] });

BLE({ id: 'health_miracle', min: 30, max: 90, w: 6,
  if: function(s) { return Life.get(s, 'hea') < 40; },
  t: function(s) { return 'A doctor looked at your charts and said "huh" in a worried voice.'; },
  ch: [
    { t: 'Expensive treatment', fx: function(s) {
        if (s.money >= 20000) { Life.cash(s, -20000); Life.bump(s, 'hea', 25); return 'Money can buy health. Who knew.'; }
        return 'You cannot afford it. Thoughts and prayers.'; } },
    { t: 'Ignore it', fx: function(s) { Life.bump(s, 'hea', -10); return 'Denial: free, side effects fatal.'; } }
  ] });
/* __PART4__ */
BLE({ id: 'old_aches', min: 50, max: 100, w: 12,
  t: function(s) { return 'Everything hurts. Getting out of bed now counts as cardio.'; },
  ch: [{ t: 'Creak', fx: function(s) { Life.bump(s, 'hea', -4); Life.bump(s, 'hap', -3); return null; } }] });

BLE({ id: 'old_retire', min: 60, max: 70, w: 10,
  if: function(s) { return !!s.job; },
  t: function(s) { return 'Retirement looms. Freedom, or unemployment with cake?'; },
  ch: [
    { t: 'Retire', fx: function(s) { Life.retire(s); return 'Retired! Every day is Saturday now.'; } },
    { t: 'Keep working', fx: function(s) { return 'The grind respects you back. Barely.'; } }
  ] });

BLE({ id: 'old_grandkids', min: 55, max: 95, w: 8,
  if: function(s) { return s.children.length > 0; },
  t: function(s) { return 'Your kid had a kid. You are now officially vintage.'; },
  ch: [{ t: 'Spoil it', fx: function(s) { Life.bump(s, 'hap', 12); Life.cash(s, -500); return 'Grandparent mode: activated.'; } }] });

BLE({ id: 'dark_cult', min: 18, max: 60, w: 6,
  t: function(s) { return 'A smiling group in matching tracksuits invites you to "the compound". Free smoothies.'; },
  ch: [
    { t: 'Join', fx: function(s) { Life.bump(s, 'hap', 8); Life.bump(s, 'sma', -10); Life.cash(s, -2000); return 'Great smoothies. Your savings, less so.'; } },
    { t: 'Run', fx: function(s) { return 'You outran enlightenment.'; } }
  ] });

BLE({ id: 'dark_haunted', min: 10, max: 80, w: 7,
  t: function(s) { return 'Your house is definitely haunted. The ghost keeps eating your leftovers.'; },
  ch: [
    { t: 'Exorcism', fx: function(s) { Life.cash(s, -800); Life.bump(s, 'hap', 5); return 'Ghost evicted. Leftovers safe.'; } },
    { t: 'Befriend it', fx: function(s) { Life.bump(s, 'hap', 6); return 'You and Greg the ghost are tight now.'; } }
  ] });

BLE({ id: 'dark_will', min: 40, max: 90, w: 7,
  if: function(s) { return !s.will && s.money > 50000; },
  t: function(s) { return 'A lawyer suggests writing a will before you die embarrassingly.'; },
  ch: [
    { t: 'Write one', fx: function(s) { s.will = true; return 'Will written. Your money now has plans.'; } },
    { t: 'Live forever instead', fx: function(s) { return 'Bold plan. We will see.'; } }
  ] });

BLE({ id: 'fame_viral', min: 14, max: 50, w: 6,
  if: function(s) { return Life.get(s, 'loo') > 60; },
  t: function(s) { return 'A video of you sneezing went insanely viral. Fame is stupid like that.'; },
  ch: [{ t: 'Embrace it', fx: function(s) { Life.fame(s, 15); Life.bump(s, 'hap', 10); return '15 minutes starts now.'; } }] });

BLE({ id: 'fame_troll', min: 14, max: 60, w: 7,
  if: function(s) { return (s.fame || 0) > 10; },
  t: function(s) { return 'Trolls are mass-disliking everything you post. The internet loves you.'; },
  ch: [
    { t: 'Clap back', fx: function(s) { Life.bump(s, 'hap', -5); Life.fame(s, 5); return 'Drama equals engagement. Math.'; } },
    { t: 'Log off', fx: function(s) { Life.bump(s, 'hap', 4); return 'Touch grass instead.'; } }
  ] });

BLE({ id: 'pet_stray', min: 8, max: 70, w: 8,
  t: function(s) { return 'A stray animal followed you home and refuses to leave. It has chosen you.'; },
  ch: [
    { t: 'Keep it', fx: function(s) { Life.pet(s, 'dog'); Life.bump(s, 'hap', 12); return 'Unconditional love acquired.'; } },
    { t: 'Shoo', fx: function(s) { Life.bump(s, 'hap', -5); Life.bump(s, 'karma', -4); return 'It stared into your soul as it left.'; } }
  ] });

BLE({ id: 'pet_died', min: 10, max: 95, w: 8,
  if: function(s) { return s.pets.length > 0; },
  t: function(s) { return 'Your beloved pet crossed the rainbow bridge. Devastating.'; },
  ch: [{ t: 'Mourn', fx: function(s) { Life.petDie(s); Life.bump(s, 'hap', -18); return null; } }] });

BLE({ id: 'mil_draft', min: 18, max: 25, w: 6,
  if: function(s) { return !s.job || s.job.track !== 'mil'; },
  t: function(s) { return 'The army is hiring. Free travel! To deserts. Under fire.'; },
  ch: [
    { t: 'Enlist', fx: function(s) { Life.setJob(s, 'soldier'); Life.bump(s, 'hea', 5); return 'Hooah. Probably.'; } },
    { t: 'College instead', fx: function(s) { return null; } }
  ] });

BLE({ id: 'mil_deploy', min: 18, max: 45, w: 8,
  if: function(s) { return !!s.job && s.job.track === 'mil'; },
  t: function(s) { return 'Deployment orders. Twelve months of sand, sweat, and MREs.'; },
  ch: [{ t: 'Serve', fx: function(s) {
      if (Life.chance(0.15)) { Life.bump(s, 'hea', -30); return 'You came home hurt but breathing. Hero.'; }
      Life.bump(s, 'hap', 8); s.job.perf = (s.job.perf || 50) + 10; return 'Tour complete. Medals and stories.'; } }] });

BLE({ id: 'casino_tip', min: 18, max: 80, w: 7,
  if: function(s) { return s.money > 1000; },
  t: function(s) { return 'A drunk guy at the bar swears the horses are rigged in your favor, buddy.'; },
  ch: [
    { t: 'Bet $500', fx: function(s) {
        if (Life.chance(0.3)) { Life.cash(s, 2500); Life.bump(s, 'hap', 8); return 'The horse came through! The drunk guy vanished. Suspicious.'; }
        Life.cash(s, -500); return 'The horse finished somewhere in the next timezone.'; } },
    { t: 'Walk away', fx: function(s) { return null; } }
  ] });

BLE({ id: 'lotto_win', min: 18, max: 99, w: 3,
  t: function(s) { return 'Lottery fever! Everyone at work is pooling money. Suckers. Probably.'; },
  ch: [
    { t: 'Buy 10 tickets', fx: function(s) {
        if (Life.chance(0.02)) { Life.cash(s, 5000000); Life.bump(s, 'hap', 40); return 'JACKPOT! You screamed so loud the neighbors called.'; }
        Life.cash(s, -50); return 'Won $4. Net loss. Math is cruel.'; } },
    { t: 'Skip', fx: function(s) { return null; } }
  ] });

BLE({ id: 'vacation_ad', min: 18, max: 80, w: 7,
  if: function(s) { return s.money > 3000; },
  t: function(s) { return 'Travel deals! Sunny beaches, suspicious street meat, memories.'; },
  ch: [
    { t: 'Book it ($2000)', fx: function(s) {
        Life.cash(s, -2000);
        if (Life.chance(0.2)) { Life.bump(s, 'hea', -8); return 'Food poisoning memoir: chapter one.'; }
        Life.bump(s, 'hap', 15); return 'Best week of your life. Tan lines as souvenirs.'; } },
    { t: 'Staycation', fx: function(s) { Life.bump(s, 'hap', 2); return 'Couch: visited.'; } }
  ] });
/* __PART5__ */
BLE({ id: 'parent_die', min: 20, max: 90, w: 10,
  if: function(s) { return s.parents.some(function(p) { return p.alive; }); },
  t: function(s) { return 'One of your parents passed away. The funeral was beautiful and awful.'; },
  ch: [{ t: 'Grieve', fx: function(s) {
      var inh = 5000 + Math.floor(Life.rnd() * 40000);
      Life.killParent(s); Life.cash(s, inh); Life.bump(s, 'hap', -20);
      return 'You inherited some money. It does not feel like winning.'; } }] });

BLE({ id: 'sib_rival', min: 10, max: 40, w: 7,
  if: function(s) { return s.siblings.length > 0; },
  t: function(s) { return 'Your sibling got engaged, promoted, AND a puppy. In one week.'; },
  ch: [
    { t: 'Be happy for them', fx: function(s) { Life.bump(s, 'karma', 5); Life.bump(s, 'hap', -3); return 'Smiling through the jealousy.'; } },
    { t: 'Start a feud', fx: function(s) { Life.bump(s, 'karma', -8); return 'Family dinners are now a contact sport.'; } }
  ] });

BLE({ id: 'friend_betray', min: 14, max: 70, w: 7,
  t: function(s) { return 'Your best friend told your crush your browser history. All of it.'; },
  ch: [
    { t: 'Forgive', fx: function(s) { Life.bump(s, 'karma', 6); return 'Saintly. Stupid, but saintly.'; } },
    { t: 'End friendship', fx: function(s) { Life.bump(s, 'hap', -6); return 'Downgraded to mortal enemy.'; } }
  ] });

BLE({ id: 'work_crush', min: 18, max: 60, w: 7,
  if: function(s) { return !!s.job && !s.partner; },
  t: function(s) { return 'Someone at work keeps accidentally touching your hand near the printer.'; },
  ch: [
    { t: 'Flirt back', fx: function(s) {
        if (Life.chance(0.5)) { Life.newPartner(s); return 'Office romance! HR is watching. Kidding. Mostly.'; }
        return 'HR is definitely watching now.'; } },
    { t: 'Professional only', fx: function(s) { return null; } }
  ] });

BLE({ id: 'midlife', min: 38, max: 52, w: 8,
  t: function(s) { return 'You stared into the mirror and saw your parent staring back.'; },
  ch: [
    { t: 'Sports car!', fx: function(s) {
        if (s.money >= 120000) { Life.cash(s, -120000); Life.buyAsset(s, 'cars', 'sports'); return 'Crisis: managed.'; }
        return 'You cannot afford the crisis. Crisis postponed.'; } },
    { t: 'Accept aging', fx: function(s) { Life.bump(s, 'hap', -5); return 'Gracefully. Ish.'; } }
  ] });

BLE({ id: 'alien', min: 10, max: 80, w: 3,
  t: function(s) { return 'You were abducted by aliens. They probed, took notes, left a 1-star review of humanity.'; },
  ch: [{ t: 'Whoa', fx: function(s) { Life.bump(s, 'hap', 5); Life.bump(s, 'sma', 3); return 'You now believe. You saw things.'; } }] });

BLE({ id: 'lottery_neighbor', min: 25, max: 80, w: 6,
  t: function(s) { return 'Your neighbor won the lottery and bought a solid gold mailbox.'; },
  ch: [
    { t: 'Congratulate', fx: function(s) { Life.bump(s, 'karma', 3); return 'The mailbox judges you daily now.'; } },
    { t: 'Steal the mailbox', fx: function(s) { return Life.doCrime(s, 'burglary'); } }
  ] });

BLE({ id: 'gym_bro', min: 16, max: 50, w: 7,
  t: function(s) { return 'A gym bro offered to sell you protein powder from his trunk. No label. Great price.'; },
  ch: [
    { t: 'Buy it', fx: function(s) { Life.cash(s, -100); Life.bump(s, 'hea', 5); return 'Gains. Probably. Do not ask questions.'; } },
    { t: 'Decline', fx: function(s) { return null; } }
  ] });

BLE({ id: 'boss_affair', min: 22, max: 60, w: 5,
  if: function(s) { return !!s.job; },
  t: function(s) { return 'Your boss winked at you in the elevator. Promotions work in mysterious ways.'; },
  ch: [
    { t: 'Flirt', fx: function(s) {
        if (Life.chance(0.5)) { Life.raise(s); Life.bump(s, 'karma', -8); return 'Promoted! HR will never know. From you.'; }
        Life.bump(s, 'hap', -8); return 'Awkward elevator rides forever.'; } },
    { t: 'Report', fx: function(s) { Life.bump(s, 'karma', 5); s.job.perf = (s.job.perf || 50) + 5; return 'Professionalism: rewarded quietly.'; } }
  ] });

BLE({ id: 'mugged', min: 14, max: 80, w: 7,
  t: function(s) { return 'A mugger demanded your wallet. He had a knife. You had opinions.'; },
  ch: [
    { t: 'Hand it over', fx: function(s) { Life.cash(s, -Math.min(s.money, 300)); Life.bump(s, 'hap', -6); return 'Alive and poorer. Acceptable trade.'; } },
    { t: 'Fight', fx: function(s) {
        if (Life.chance(0.3 + Life.get(s, 'hea') / 300)) { Life.bump(s, 'hap', 8); return 'You fought off a mugger! Action hero origin story.'; }
        Life.bump(s, 'hea', -20); Life.cash(s, -Math.min(s.money, 300)); return 'You got stabbed AND robbed. Worst of both.'; } }
  ] });

BLE({ id: 'car_crash', min: 16, max: 85, w: 7,
  t: function(s) { return 'You rear-ended someone while checking if your hair looked okay in the mirror.'; },
  ch: [{ t: 'It looked fine', fx: function(s) { Life.cash(s, -1500); Life.bump(s, 'hea', -8); Life.bump(s, 'hap', -5); return null; } }] });

BLE({ id: 'aunt_inherit', min: 25, max: 80, w: 5,
  t: function(s) { return 'A distant aunt you met twice died and left you something in her will.'; },
  ch: [{ t: 'Accept', fx: function(s) {
      var n = 20000 + Math.floor(Life.rnd() * 180000);
      Life.cash(s, n); Life.bump(s, 'hap', 8); return 'A windfall from beyond. Thanks, auntie.'; } }] });

BLE({ id: 'church', min: 10, max: 90, w: 6,
  t: function(s) { return 'A place of worship invited you in. The choir slaps, honestly.'; },
  ch: [
    { t: 'Pray', fx: function(s) { Life.bump(s, 'hap', 6); Life.bump(s, 'karma', 4); return 'Spiritually hydrated.'; } },
    { t: 'Donate $100', fx: function(s) {
        if (s.money >= 100) { Life.cash(s, -100); Life.bump(s, 'karma', 8); Life.bump(s, 'hap', 4); return 'Generous soul.'; }
        return 'The plate passed you by. Awkward eye contact.'; } },
    { t: 'Sleep in', fx: function(s) { Life.bump(s, 'hap', 3); return null; } }
  ] });

BLE({ id: 'protest', min: 16, max: 70, w: 6,
  t: function(s) { return 'A protest marched past. Signs, chants, strong opinions, food trucks.'; },
  ch: [
    { t: 'Join in', fx: function(s) {
        if (Life.chance(0.2)) { Life.doCrime(s, 'mug'); return 'The protest got spicy. You got arrested-adjacent.'; }
        Life.bump(s, 'hap', 5); Life.bump(s, 'karma', 3); return 'You chanted. Democracy exercised.'; } },
    { t: 'Watch', fx: function(s) { return null; } }
  ] });

BLE({ id: 'divorce_papers', min: 22, max: 75, w: 7,
  if: function(s) { return !!s.partner && s.partner.married; },
  t: function(s) { return 'Your spouse left divorce papers on the counter. Next to the grocery list. Priorities.'; },
  ch: [
    { t: 'Sign', fx: function(s) {
        var cut = Math.floor(s.money * 0.4);
        Life.cash(s, -cut); Life.dumpPartner(s); Life.bump(s, 'hap', -20);
        return 'Divorced. Half your stuff now lives with someone who hates you.'; } },
    { t: 'Beg', fx: function(s) {
        if (Life.chance(0.4)) { Life.bump(s, 'hap', 5); return 'They stayed. Couples therapy it is.'; }
        Life.dumpPartner(s); Life.bump(s, 'hap', -15); return 'Begging failed. Dignity also divorced you.'; } }
  ] });

BLE({ id: 'kid_trouble', min: 28, max: 60, w: 7,
  if: function(s) { return s.children.some(function(c) { return c.alive && (s.age - c.born) >= 10 && (s.age - c.born) <= 18; }); },
  t: function(s) { return 'The school called. Your teenager did something that requires air quotes to explain.'; },
  ch: [
    { t: 'Ground them', fx: function(s) { Life.bump(s, 'hap', -4); return 'Grounded. They hate you with the fire of a thousand suns.'; } },
    { t: 'Laugh it off', fx: function(s) { Life.bump(s, 'hap', 3); Life.bump(s, 'karma', -3); return 'You did worse at their age. Circle of life.'; } }
  ] });

BLE({ id: 'wedding_drunk', min: 20, max: 70, w: 6,
  if: function(s) { return !!s.partner && s.partner.married; },
  t: function(s) { return 'At a wedding, the best man objected as a joke. Nobody laughed. Especially the bride.'; },
  ch: [{ t: 'Yikes', fx: function(s) { Life.bump(s, 'hap', 3); return 'Your marriage looks great by comparison.'; } }] });

BLE({ id: 'kid_flute', min: 25, max: 45, w: 6,
  if: function(s) { return s.children.length > 0; },
  t: function(s) { return 'Your child started learning the recorder. The dog filed a noise complaint.'; },
  ch: [{ t: 'Endure', fx: function(s) { Life.bump(s, 'hap', -3); return 'Hot cross buns. For six months.'; } }] });

BLE({ id: 'old_bingo', min: 65, max: 100, w: 8,
  t: function(s) { return 'Bingo night at the community center. The stakes have never been higher.'; },
  ch: [{ t: 'Play', fx: function(s) {
      if (Life.chance(0.25)) { Life.cash(s, 500); Life.bump(s, 'hap', 10); return 'BINGO! You beat Ethel. Ethel is furious.'; }
      Life.cash(s, -20); return 'No bingo. Ethel smirked.'; } }] });

BLE({ id: 'senile_shout', min: 75, max: 110, w: 8,
  t: function(s) { return 'You yelled at clouds today. The clouds did not apologize.'; },
  ch: [{ t: 'Classic', fx: function(s) { Life.bump(s, 'hap', 2); return null; } }] });

BLE({ id: 'road_rage', min: 18, max: 70, w: 7,
  t: function(s) { return 'Someone cut you off and gave you the finger. The finger did not apologize either.'; },
  ch: [
    { t: 'Rage back', fx: function(s) { Life.bump(s, 'hap', 2); Life.bump(s, 'karma', -4); return 'Honked for a full minute. Felt amazing. Achieved nothing.'; } },
    { t: 'Let it go', fx: function(s) { Life.bump(s, 'karma', 3); return 'Enlightened driver.'; } }
  ] });

BLE({ id: 'blood_drive', min: 18, max: 65, w: 6,
  t: function(s) { return 'A blood drive van is parked outside. Free cookies for your bodily fluids.'; },
  ch: [
    { t: 'Donate', fx: function(s) { Life.bump(s, 'hea', -3); Life.bump(s, 'karma', 8); Life.bump(s, 'hap', 4); return 'Cookies earned. Heroism achieved.'; } },
    { t: 'Keep blood', fx: function(s) { return 'Selfish. But hydrated with your own fluids.'; } }
  ] });

BLE({ id: 'pyramid', min: 18, max: 60, w: 6,
  t: function(s) { return 'An old friend invited you to a "business opportunity" involving essential oils and dreams.'; },
  ch: [
    { t: 'Join', fx: function(s) { Life.cash(s, -2000); return 'You now own 400 bottles of lavender regret.'; } },
    { t: 'Decline', fx: function(s) { Life.bump(s, 'sma', 2); return 'The friendship did not survive your financial literacy.'; } }
  ] });

BLE({ id: 'landlord', min: 18, max: 80, w: 7,
  t: function(s) { return 'Your landlord raised the rent because "the market". The market is a jerk.'; },
  ch: [
    { t: 'Pay up', fx: function(s) { Life.cash(s, -2000); return 'Housing: secured at knife-point prices.'; } },
    { t: 'Argue', fx: function(s) {
        if (Life.chance(0.3)) { Life.bump(s, 'hap', 5); return 'Rent frozen! You terrifying negotiator.'; }
        Life.bump(s, 'hap', -6); return 'Rent raised extra out of spite. Probably.'; } }
  ] });

BLE({ id: 'neighbor_noise', min: 18, max: 80, w: 6,
  t: function(s) { return 'The neighbors are blasting music at 3am. Again. It slaps, honestly, but still.'; },
  ch: [
    { t: 'Bang on wall', fx: function(s) { Life.bump(s, 'karma', -2); return 'Now it is a wall-banging duet.'; } },
    { t: 'Join them', fx: function(s) { Life.bump(s, 'hap', 6); return 'Plot twist: great party.'; } }
  ] });

BLE({ id: 'plane_scare', min: 10, max: 85, w: 5,
  t: function(s) { return 'Turbulence hit so hard the pilot said "yikes" over the intercom. YIKES.'; },
  ch: [{ t: 'Pray', fx: function(s) { Life.bump(s, 'hap', -4); return 'Landed. Clapped like everyone else.'; } }] });

BLE({ id: 'horoscope', min: 14, max: 80, w: 5,
  t: function(s) { return 'Your horoscope says today brings "unexpected transitions". Vague. Rude.'; },
  ch: [{ t: 'Believe', fx: function(s) { Life.bump(s, 'hap', 2); return null; } }] });

BLE({ id: 'reunion', min: 28, max: 60, w: 6,
  t: function(s) { return 'High school reunion invite. Time to flex or hide.'; },
  ch: [
    { t: 'Go flex', fx: function(s) {
        if (s.money > 200000) { Life.bump(s, 'hap', 15); return 'You arrived rich. The gym teacher wept.'; }
        Life.bump(s, 'hap', -8); return 'Everyone else arrived rich. You arrived.'; } },
    { t: 'Skip', fx: function(s) { return 'Mystery preserved.'; } }
  ] });

BLE({ id: 'prison_shank', min: 14, max: 90, w: 10,
  if: function(s) { return s.prison.inmate; },
  t: function(s) { return 'A lifer offered you a shank "for protection". Prison Amazon.'; },
  ch: [
    { t: 'Take it', fx: function(s) {
        if (Life.chance(0.4)) { s.prison.sentence += 3; return 'Caught with it. Sentence extended. Rookie mistake.'; }
        return 'Protection acquired. Sleep slightly easier.'; } },
    { t: 'Refuse', fx: function(s) { Life.bump(s, 'hea', -5); return 'You look deliciously unarmed now.'; } }
  ] });

BLE({ id: 'prison_gang', min: 14, max: 90, w: 8,
  if: function(s) { return s.prison.inmate; },
  t: function(s) { return 'A gang wants you as a member. Dues are paid in commissary noodles.'; },
  ch: [
    { t: 'Join', fx: function(s) { Life.bump(s, 'hap', 5); Life.bump(s, 'karma', -8); return 'Protected. Owned. Same thing in here.'; } },
    { t: 'Stay solo', fx: function(s) { Life.bump(s, 'hea', -8); return 'Lone wolf. Bruised wolf.'; } }
  ] });

BLE({ id: 'prison_parole', min: 14, max: 90, w: 9,
  if: function(s) { return s.prison.inmate && s.prison.served >= 2; },
  t: function(s) { return 'Parole hearing. Three strangers decide your next decade over coffee.'; },
  ch: [{ t: 'Beg prettily', fx: function(s) {
      if (Life.chance(0.35 + (s.prison.good || 0) / 200)) { Life.parole(s); return 'PAROLED! Sunlight has never slapped so good.'; }
      return 'Denied. The coffee was evidently bad.'; } }] });

BLE({ id: 'std_scare', min: 16, max: 60, w: 6,
  t: function(s) { return 'Something itches that should absolutely not itch.'; },
  ch: [
    { t: 'Clinic ($500)', fx: function(s) {
        if (s.money >= 500) { Life.cash(s, -500); Life.bump(s, 'hea', 5); return 'Clean bill. Expensive relief.'; }
        return 'Cannot afford the clinic. Itchonomics.'; } },
    { t: 'Ignore it', fx: function(s) { Life.bump(s, 'hea', -12); return 'Bold. Medically catastrophic, but bold.'; } }
  ] });
BLE({ id: 'love_meet', min: 16, max: 60, w: 12,
  if: function(s) { return !s.partner && s.age >= 16; },
  t: function(s) { return 'You locked eyes with a stranger across a crowded food court.'; },
  ch: [
    { t: 'Approach', fx: function(s) {
        if (Life.chance(0.35 + Life.get(s, 'loo') / 250)) { Life.newPartner(s); return 'Sparks fly. You are officially an item.'; }
        Life.bump(s, 'hap', -6); return 'They had a partner. An enormous one.'; } },
    { t: 'Keep walking', fx: function(s) { return null; } }
  ] });
