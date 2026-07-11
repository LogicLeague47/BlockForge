// Shared profanity filter — used by both client and server.
// Comprehensive word list based on CrazyGames required filter.

// Multi-word phrases (matched as substrings)
const PHRASES = [
  'kill yourself', 'kys', 'commit suicide', 'neck yourself',
  'unalive yourself', 'rope yourself',
];

// Single words (matched as whole words to avoid false positives like "Scunthorpe")
const WORDS = [
  // Sexual profanity
  'fuck','fucker','fuckers','fuckface','fuckhead','fuckhole','fucking',
  'fuckboy','fuckbuddy','fuckstick','fucktard','fuckwit','fucked','fuckedup',
  'blowjob','cum','cumshot','cumslut','cunnilingus','dildo','ejaculate',
  'fellatio','handjob','hentai','masturbate','masturbation','orgasm',
  'penis','penises','porn','porno','pornography','pussy','pussies','pussylips',
  'tits','titties','titty','twat','twatface','twats',
  // General profanity
  'ass','assface','asshat','asshead','asshole','asswipe','asswipe',
  'bastard','bigass','bullshit','crap','damn','damnit','dipshit',
  'douche','douchebag','dumbass','dumbshit','goddamn','goddamnit',
  'hell','horseshit','jackass','jackoff','jerkoff','kissass','lameass',
  'loser','moron','prick','pricks','punkass','scum','scumbag',
  'shit','shitty','sissy','stupid','turd','ugly','wiseass',
  'idiot','bitch','bitches',
  // Body/insult terms
  'boob','boobs','cock','dick','dickbag','dickbrain','dickface','dickhead',
  'dickhole','dickless','dicks','dickwad','dickweed',
  // Racial/ethnic slurs
  'beaner','beaners','chink','chinks','coon','coons','cracker',
  'darkie','darky','gook','gooks','honky','jigaboo','jiggaboo',
  'kike','kikes','negro','negroid','nigga','niggah','niggard',
  'niggardly','niggas','nigger','niggers','redneck','slope','slopes',
  'spic','spick','tacohead','wetback','whitey','wop',
  // Homophobic slurs
  'dyke','dykes','fag','faggot','faggots','faggy','fagot','fags',
  'homo','queer','queers','tranny',
  // Hate/violent terms
  'hitler','kkk','lynch','murder','nazi','neonazi','pedo','pedophile',
  'rape','raped','raping','rapist','swastika',
  'bestiality','incest','lolita',
  // Drug references
  'cocaine','crack','heroin','junkie','meth','weed',
  // Harmful phrases
  'suicide',
  // Disability slurs
  'retard','retarded',
  // Additional common terms
  'slut','sluts','slutbag','whore','whoreface','whorehouse','whores',
  'cunt','cuntface','cuntlicker','cunts',
];

// Build regex for single words (whole-word match)
const _wordPattern = WORDS.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const _wordRegex = new RegExp(`\\b(${_wordPattern})\\b`, 'gi');

// Build regex for multi-word phrases (substring match)
const _phrasePattern = PHRASES.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const _phraseRegex = new RegExp(`(${_phrasePattern})`, 'gi');

// Catch repeated-character evasion (e.g. "f.u.c.k", "f u c k")
const _splitPattern = /[\s._\-*,\/\\]+/g;

export function filterProfanity(text) {
  if (!text) return text;
  // Match single words (whole-word)
  let result = text.replace(_wordRegex, (m) => '*'.repeat(m.length));
  // Match phrases (substring)
  result = result.replace(_phraseRegex, (m) => '*'.repeat(m.length));
  // Also catch separator evasion: "f u c k" → "fuck"
  const collapsed = text.replace(_splitPattern, '');
  const collapsedWordMatch = collapsed.match(_wordRegex);
  if (collapsedWordMatch) {
    for (const word of collapsedWordMatch) {
      const re = new RegExp(word.split('').join('[\\s._\\-*,/\\\\]*'), 'gi');
      result = result.replace(re, (m) => '*'.repeat(m.length));
    }
  }
  const collapsedPhraseMatch = collapsed.match(_phraseRegex);
  if (collapsedPhraseMatch) {
    for (const phrase of collapsedPhraseMatch) {
      const re = new RegExp(phrase.split('').join('[\\s._\\-*,/\\\\]*'), 'gi');
      result = result.replace(re, (m) => '*'.repeat(m.length));
    }
  }
  return result;
}

export function hasProfanity(text) {
  if (!text) return false;
  _wordRegex.lastIndex = 0;
  _phraseRegex.lastIndex = 0;
  if (_wordRegex.test(text)) return true;
  if (_phraseRegex.test(text)) return true;
  const collapsed = text.replace(_splitPattern, '');
  _wordRegex.lastIndex = 0;
  _phraseRegex.lastIndex = 0;
  if (_wordRegex.test(collapsed)) return true;
  return _phraseRegex.test(collapsed);
}
