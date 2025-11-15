import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Share2, Bookmark } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Calculate reading time based on word count
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute));
  return `${minutes} min read`;
};

// Mock data - in production, this would come from an API
const articles: Record<string, {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  category: string;
  content: string;
  author?: string;
  relatedArticles?: string[];
}> = {
  "1": {
    id: "1",
    title: "Celtic Cross Reading",
    subtitle: "A comprehensive 10-card spread for deep insights",
    tag: "Daily Pick",
    category: "Tarot",
    content: "The Celtic Cross is one of the most popular and comprehensive tarot spreads, offering deep insights into your current situation and future path. This 10-card layout provides a detailed view of your past, present, and potential future. Whether you're a beginner or an experienced reader, mastering the Celtic Cross can transform your tarot practice and provide profound guidance.\n\nEach card position in the Celtic Cross represents a different aspect of your life. Position 1, placed in the center, represents your current situation—the core issue or question at hand. Position 2, crossing Position 1, shows what's crossing or blocking your path. This could be an obstacle, a challenge, or even a helpful influence depending on the card's nature.\n\nPositions 3-6 form the foundation of the cross and reveal deeper layers of your journey. Position 3 represents the distant past—events or influences that have shaped your current situation. Position 4 shows the recent past, what you've just moved through. Position 5 represents the possible future, while Position 6 shows the near future—what's likely to happen soon.\n\nThe staff, formed by Positions 7-10, provides additional context and guidance. Position 7 represents your approach—how you're handling the situation or what attitude you're bringing. Position 8 shows external influences—people, events, or circumstances affecting you. Position 9 reveals your hopes and fears—what you're hoping for or worried about. Finally, Position 10 represents the outcome—the potential resolution or direction things are heading.\n\nThe beauty of the Celtic Cross lies in its ability to reveal both internal and external influences. It helps you understand not just what's happening, but why it's happening and what you can do about it. The spread creates a narrative that connects past, present, and future in a meaningful way.\n\nWhen interpreting the Celtic Cross, pay attention to the relationships between cards. Cards that reinforce each other suggest strong influences, while conflicting cards indicate tension or choices to be made. The suit distribution can reveal whether the situation is primarily emotional (Cups), action-oriented (Wands), mental (Swords), or material (Pentacles).\n\nMajor Arcana cards in the spread indicate significant life lessons or karmic influences at play. Multiple Major Arcana cards suggest a period of major transformation or important life changes. Minor Arcana cards provide more specific, day-to-day guidance and practical advice.\n\nTo get the most from this spread, focus on how the cards relate to each other. Look for patterns, conflicts, and harmonies that tell a complete story about your journey. The Celtic Cross doesn't just answer your question—it provides a comprehensive map of your situation, showing you where you've been, where you are, and where you're heading.\n\nRemember that tarot is a tool for reflection and guidance, not a fixed prediction. The cards show potential paths and influences, but you always have the power to shape your destiny through your choices and actions. Use the insights from the Celtic Cross to make informed decisions and navigate your path with greater awareness and clarity.",
    relatedArticles: ["7", "8", "5"]
  },
  "2": {
    id: "2",
    title: "Love & Relationships",
    subtitle: "Explore connections and understand dynamics",
    tag: "Recommended",
    category: "Astrology",
    content: "Understanding relationship dynamics through astrology can transform how you connect with others. Your birth chart reveals not just your romantic compatibility, but also your communication style, emotional needs, and partnership patterns. Astrology provides a unique lens through which to understand the complex dance of human connection.\n\nVenus, the planet of love, shows what you value in relationships and how you express affection. When Venus is in fire signs (Aries, Leo, Sagittarius), you express love through passion, excitement, and grand gestures. Earth sign Venus (Taurus, Virgo, Capricorn) values stability, loyalty, and practical demonstrations of care. Air sign Venus (Gemini, Libra, Aquarius) needs intellectual connection and communication. Water sign Venus (Cancer, Scorpio, Pisces) seeks deep emotional intimacy and soul-level bonding.\n\nMars reveals your passion style and how you handle conflict. Mars in fire signs approaches conflict directly and passionately, while earth signs are more methodical and persistent. Air signs prefer to talk things through, and water signs need emotional processing time. Understanding your partner's Mars placement helps you navigate disagreements more effectively.\n\nThe Moon placement indicates your emotional needs and how you seek security in partnerships. Your Moon sign shows what makes you feel safe, loved, and emotionally fulfilled. When partners understand each other's Moon signs, they can create a nurturing environment that meets both people's emotional needs.\n\nSynastry, the comparison of two birth charts, reveals the energy exchange between partners. When one person's planets aspect the other's, it creates a dynamic connection. Conjunctions create intense, merged energy. Trines and sextiles bring harmony and ease. Squares and oppositions create tension that, when worked through, can lead to growth and deeper understanding.\n\nComposite charts, created by finding the midpoint between two people's planets, reveal the relationship itself as a separate entity. This chart shows the purpose of the relationship, its strengths, challenges, and potential evolution. Understanding the composite chart helps couples see their relationship as a journey with its own destiny.\n\nHard aspects might indicate challenges that require growth, while harmonious aspects show natural compatibility and ease. However, the most challenging aspects often lead to the most profound growth. A square between Venus and Mars might create sexual tension and power struggles, but it also creates magnetic attraction and the potential for passionate connection.\n\nRemember that astrology is a tool for understanding, not a destiny. Use these insights to communicate better, honor each other's needs, and grow together. The stars don't determine your fate—they illuminate patterns and potentials. With awareness and intention, you can work with these energies to create the relationship you desire.\n\nCompatibility isn't about finding someone with a perfect chart match. It's about understanding each other's needs, respecting differences, and growing together. The most successful relationships often involve partners who complement each other, bringing different strengths to the partnership.\n\nUse astrology as a starting point for deeper conversations. Share your birth chart insights with your partner and explore how your energies interact. This can lead to greater empathy, understanding, and appreciation for each other's unique qualities and needs.",
    relatedArticles: ["4", "6", "1"]
  },
  "3": {
    id: "3",
    title: "Moon Phase Meditation",
    subtitle: "Align with lunar cycles for inner peace",
    tag: "Trending",
    category: "Moon Phases",
    content: "Aligning your meditation practice with moon phases creates a powerful rhythm that connects you to natural cycles. Each phase offers unique energy for different types of reflection and growth. The moon has been a guide for spiritual practices for thousands of years, and modern practitioners are rediscovering the profound benefits of lunar alignment.\n\nDuring the New Moon, focus on setting intentions and planting seeds for what you want to manifest. This is a time for quiet reflection and clarity about your desires. The darkness of the new moon represents a blank canvas, perfect for envisioning new beginnings. Create a sacred space, light a candle, and spend time in meditation visualizing what you want to bring into your life. Write down your intentions, being specific about what you want to manifest. The energy of the new moon supports new beginnings, so this is the ideal time to start new projects, habits, or relationships.\n\nThe Waxing Moon, from new to full, is perfect for building momentum, taking action, and working toward your goals. Your energy naturally increases during this phase, making it an excellent time for active meditation practices. Try walking meditation, movement-based practices, or dynamic visualization. As the moon grows, so does your capacity to manifest your intentions. Use this time to take concrete steps toward your goals, build habits, and gather resources. The waxing moon supports growth, expansion, and forward movement.\n\nAt the Full Moon, release what no longer serves you. This is a powerful time for letting go, forgiveness, and celebrating what you've accomplished. The full moon illuminates what needs to be released, bringing hidden patterns and emotions to the surface. Full moon meditations often focus on gratitude, release, and celebration. Create a release ritual where you write down what you're letting go of and safely burn or bury the paper. The full moon's energy is intense and can bring emotional clarity, so be gentle with yourself during this time.\n\nThe Waning Moon, from full to new, invites you to rest, reflect, and integrate lessons learned. Slow down, process your experiences, and prepare for the next cycle. This is a time for introspection, shadow work, and deep healing. Waning moon meditations focus on inner work, processing emotions, and preparing for the next new moon cycle. Use this time to review what you've learned, integrate insights, and release what's no longer needed.\n\nEach moon phase also moves through the zodiac signs, adding another layer of meaning. The moon spends about 2.5 days in each sign, creating unique energetic qualities. A new moon in Aries brings fiery, initiating energy, while a new moon in Cancer brings nurturing, emotional energy. Learning to work with both the phase and the sign creates a more nuanced practice.\n\nCreating a moon phase meditation practice doesn't require elaborate rituals. Simply being aware of the moon's phase and adjusting your meditation focus accordingly can be powerful. Keep a moon journal to track your experiences, insights, and patterns that emerge during each phase. Over time, you'll notice how your energy, emotions, and spiritual insights align with the lunar cycle.\n\nRemember that the moon's influence is subtle but profound. You don't need to force anything—simply align your practice with the natural rhythm of the lunar cycle and observe what unfolds. Trust the process and allow the moon's energy to guide your spiritual growth and inner transformation.",
    relatedArticles: ["5", "8", "1"]
  },
  "4": {
    id: "4",
    title: "Birth Chart Basics",
    subtitle: "Discover your cosmic blueprint",
    tag: "For You",
    category: "Astrology",
    content: "Your birth chart is a snapshot of the sky at the exact moment you were born. It's your cosmic blueprint, revealing your personality, talents, challenges, and life path. Also known as a natal chart, this map of the heavens at your birth moment provides profound insights into who you are and why you're here.\n\nThe Sun sign represents your core identity and ego—who you are at your essence. This is the sign most people know, as it's determined by your birth date. Your Sun sign shows your fundamental nature, your life force, and what drives you. It represents your conscious self, your will, and your creative expression. When someone asks 'What's your sign?' they're asking about your Sun sign.\n\nThe Moon sign shows your emotional nature and inner needs. While your Sun sign is who you are, your Moon sign is how you feel. It reveals your emotional responses, what makes you feel secure, and your instinctual reactions. The Moon sign is often called the 'inner child' and shows your private, emotional self. Understanding your Moon sign helps you understand your emotional needs and how to nurture yourself.\n\nRising sign (Ascendant) reveals how others perceive you and your approach to life. This is the sign that was rising on the eastern horizon at your moment of birth. Your Rising sign is like a mask you wear—it's the first impression you make and how you present yourself to the world. It also rules your physical appearance and the house system of your chart. The Rising sign is crucial because it determines which sign rules each house in your chart.\n\nPlanets represent different aspects of your personality and life experiences. Mercury governs communication, thinking, and how you process information. Venus rules love, values, beauty, and what you find attractive. Mars drives passion, action, aggression, and how you pursue what you want. Jupiter brings expansion, growth, luck, and your philosophical outlook. Saturn teaches discipline, structure, limitations, and life lessons. The outer planets (Uranus, Neptune, Pluto) represent generational influences and deeper transformations.\n\nThe houses show where these energies manifest in your life. The 1st house is self and identity, the 2nd is money and values, the 3rd is communication and siblings, the 4th is home and family, the 5th is creativity and romance, the 6th is work and health, the 7th is partnerships, the 8th is transformation and shared resources, the 9th is higher learning and philosophy, the 10th is career and public image, the 11th is friendships and goals, and the 12th is spirituality and the unconscious.\n\nAspects between planets show how different parts of your personality interact. Conjunctions create intense, merged energy. Trines bring harmony and ease. Sextiles offer opportunities. Squares create tension that requires growth. Oppositions create polarity that needs balance. Understanding aspects helps you see the complexity and richness of your chart.\n\nUnderstanding your birth chart is a journey of self-discovery. Each element works together to create your unique cosmic fingerprint. No two charts are exactly alike, even for people born on the same day, because the exact time and location of birth create a unique chart. Your birth chart is a tool for self-awareness, helping you understand your strengths, challenges, and life purpose.\n\nTo read your birth chart, start with the Big Three: your Sun, Moon, and Rising signs. These three signs form the foundation of your personality. Then explore where your planets are located (which signs and houses), and how they relate to each other (aspects). Over time, you'll develop a deeper understanding of how all these elements work together.\n\nRemember that your birth chart shows potential, not destiny. It reveals your natural inclinations and tendencies, but you always have free will. Astrology is a tool for self-awareness and growth, not a prison that determines your fate. Use your chart to understand yourself better, work with your strengths, and grow through your challenges.",
    relatedArticles: ["2", "6", "1"]
  },
  "5": {
    id: "5",
    title: "Numerology Fundamentals",
    subtitle: "Discover the power of numbers in your life",
    tag: "Featured",
    category: "Numerology",
    content: "Numerology is the ancient study of numbers and their mystical significance in our lives. Every number carries a unique vibration and meaning, and by understanding these vibrations, we can gain profound insights into our personality, life path, and destiny. Numbers have been considered sacred across cultures for thousands of years, and numerology offers a practical way to access this ancient wisdom.\n\nYour Life Path Number is the most important number in your numerology chart. It's calculated from your birth date and reveals your life's purpose, natural talents, and the lessons you're here to learn. To calculate it, add all the digits of your birth date together and reduce to a single digit (unless you get 11, 22, or 33, which are Master Numbers). For example, if you were born on March 15, 1990: 3 + 1 + 5 + 1 + 9 + 9 + 0 = 28, then 2 + 8 = 10, then 1 + 0 = 1. Your Life Path Number would be 1.\n\nLife Path 1 represents leadership, independence, and new beginnings. You're a natural pioneer and innovator. Life Path 2 embodies cooperation, diplomacy, and partnership. You excel at bringing people together. Life Path 3 is creative, expressive, and joyful. You're here to inspire and communicate. Life Path 4 is practical, organized, and builds lasting structures. You're the builder and stabilizer.\n\nLife Path 5 represents freedom, adventure, and change. You're here to experience life fully. Life Path 6 is nurturing, responsible, and service-oriented. You're the caregiver and healer. Life Path 7 is spiritual, analytical, and seeks truth. You're the seeker and philosopher. Life Path 8 is ambitious, material, and achieves great success. You're the achiever and manifestor.\n\nLife Path 9 is humanitarian, compassionate, and completes cycles. You're here to serve humanity. Master Number 11 is intuitive, inspirational, and brings spiritual enlightenment. Master Number 22 is the Master Builder, creating on a large scale. Master Number 33 is the Master Teacher, bringing love and healing to the world.\n\nYour Expression Number (also called Destiny Number) is calculated from your full birth name and reveals your natural talents, abilities, and what you're meant to express in this lifetime. Each letter corresponds to a number (A=1, B=2, etc.), and you add all the letters of your full name together. This number shows your potential and what you're capable of achieving.\n\nYour Soul Urge Number (also called Heart's Desire) reveals your inner motivations, deepest desires, and what drives you at the soul level. It's calculated from the vowels in your name. This number shows what you truly want, often on a subconscious level, and what brings you fulfillment.\n\nYour Personality Number shows how others perceive you and the outer mask you present to the world. It's calculated from the consonants in your name. This number reveals your social personality and how you interact with others.\n\nPersonal Year Numbers change annually and show the theme and energy of each year of your life. To calculate, add your birth month and day to the current year, then reduce to a single digit. Personal Year 1 is about new beginnings, Year 2 is about relationships, Year 3 is about creativity, Year 4 is about building foundations, Year 5 is about change, Year 6 is about responsibility, Year 7 is about introspection, Year 8 is about achievement, and Year 9 is about completion.\n\nUnderstanding numerology helps you align with your natural rhythms and cycles. By knowing your numbers, you can make better decisions, understand your relationships, and navigate life's challenges with greater awareness. Numerology complements other spiritual practices like astrology and tarot, providing another layer of insight into your journey.\n\nNumbers appear everywhere in your life—in addresses, phone numbers, dates, and names. Pay attention to repeating numbers, as they often carry messages. Seeing 111 might indicate new beginnings, 222 suggests balance and partnership, 333 represents creativity and expression, 444 indicates stability and foundation-building, 555 suggests change is coming, 666 reminds you to balance material and spiritual, 777 indicates spiritual growth, 888 suggests material abundance, and 999 represents completion and service.\n\nUse numerology as a tool for self-discovery and guidance. Calculate your key numbers and explore their meanings. Notice how numbers appear in your daily life and what messages they might be bringing. Like any spiritual practice, numerology works best when combined with intuition and personal reflection. Trust your inner wisdom as you explore the world of numbers.",
    relatedArticles: ["3", "7", "8"]
  },
  "6": {
    id: "6",
    title: "Understanding Planetary Aspects",
    subtitle: "How planets interact in your birth chart",
    tag: "Advanced",
    category: "Astrology",
    content: "Planetary aspects are the angles formed between planets in your birth chart, and they reveal how different parts of your personality and life experiences interact. Understanding aspects is crucial for reading a birth chart accurately, as they show the dynamic relationships between planetary energies.\n\nA conjunction occurs when two planets are within 8-10 degrees of each other. This creates intense, merged energy where the planets' qualities blend together. Conjunctions can be harmonious or challenging depending on the planets involved. A Sun-Moon conjunction creates strong emotional alignment, while a Mars-Saturn conjunction might create frustration that requires discipline to overcome.\n\nA trine forms when planets are 120 degrees apart, creating harmonious, flowing energy. Trines represent natural talents and areas where things come easily. They're often called 'lazy aspects' because the energy flows so smoothly that you might not fully develop these gifts. A Venus-Jupiter trine brings natural charm and abundance, while a Mercury-Uranus trine indicates brilliant, innovative thinking.\n\nA sextile occurs when planets are 60 degrees apart, creating opportunities and potential. Sextiles require some effort to activate but offer positive possibilities. They represent areas where you can grow and develop with relative ease. A Moon-Venus sextile suggests emotional harmony and artistic sensitivity, while a Mars-Jupiter sextile indicates enthusiasm and successful action.\n\nA square forms when planets are 90 degrees apart, creating tension, conflict, and the need for growth. Squares are challenging but powerful aspects that force you to develop and integrate conflicting energies. They create friction that, when worked through, leads to significant growth. A Sun-Saturn square might create self-doubt that, when overcome, leads to great discipline and achievement.\n\nAn opposition occurs when planets are 180 degrees apart, creating polarity and the need for balance. Oppositions show areas where you need to integrate opposite qualities. They often manifest in relationships, where you project one side and attract the other. A Venus-Mars opposition might create attraction-repulsion dynamics in relationships, requiring you to balance love and desire.\n\nOrbs determine how exact an aspect needs to be. Tighter orbs (smaller degrees) create stronger aspects, while wider orbs create weaker influences. Major aspects (conjunctions, trines, squares, oppositions) typically use orbs of 8-10 degrees, while minor aspects use smaller orbs of 2-3 degrees.\n\nMinor aspects add nuance to chart interpretation. A semisextile (30 degrees) creates subtle connections. A semisquare (45 degrees) creates mild tension. A sesquiquadrate (135 degrees) creates irritation. A quincunx (150 degrees) creates adjustment needs. These aspects are subtler but still significant.\n\nStelliums occur when three or more planets are grouped together, creating intense focus in that area of life. A stellium in the 10th house might indicate a career-focused life, while a stellium in water signs suggests strong emotional sensitivity.\n\nGrand Trines form when three planets create a triangle of trines, indicating natural talent and ease in that area. However, this can also create complacency. Grand Crosses form when four planets create a square pattern, indicating significant challenges and the potential for major growth.\n\nUnderstanding aspects helps you see the complexity of your chart. No planet works in isolation—they all interact, creating a unique pattern of energies. By understanding these relationships, you gain deeper insight into your personality, relationships, and life path. Aspects show not just what you have, but how it all works together.",
    relatedArticles: ["2", "4", "1"]
  },
  "7": {
    id: "7",
    title: "Three Card Tarot Spreads",
    subtitle: "Simple yet powerful reading techniques",
    tag: "Beginner",
    category: "Tarot",
    content: "Three-card tarot spreads are among the most versatile and accessible reading techniques, perfect for both beginners and experienced readers. Despite their simplicity, three-card spreads can provide profound insights into any situation. The beauty of these spreads lies in their clarity and directness.\n\nThe most common three-card spread is Past, Present, Future. This classic layout shows the timeline of your situation. The first card represents influences from your past that are affecting the current situation. The second card shows your present circumstances and energy. The third card reveals potential outcomes based on your current trajectory. This spread is excellent for understanding how situations develop over time and seeing the flow of energy.\n\nAnother popular variation is Situation, Action, Outcome. The first card shows your current situation clearly. The second card suggests what action you might take or what approach would be helpful. The third card shows the likely outcome if you follow that path. This spread is perfect for decision-making and understanding the consequences of your choices.\n\nMind, Body, Spirit is a three-card spread that addresses different aspects of your being. The first card represents your mental state, thoughts, and beliefs. The second card shows your physical condition, energy, and material circumstances. The third card reveals your spiritual state, inner wisdom, and connection to something greater. This spread helps you see how these three aspects are aligned or need balancing.\n\nYou, Them, Relationship is ideal for understanding partnerships. The first card shows your energy and perspective. The second card reveals the other person's energy and perspective. The third card shows the relationship dynamic itself—how you interact and what the connection is about. This spread is excellent for romantic relationships, friendships, or any partnership.\n\nProblem, Solution, Outcome addresses challenges directly. The first card identifies the core issue or challenge. The second card suggests the solution or approach to take. The third card shows what will happen if you implement the solution. This spread cuts through confusion and provides clear guidance.\n\nStrengths, Challenges, Advice is a self-reflection spread. The first card shows your strengths and resources. The second card reveals challenges or obstacles. The third card offers advice on how to move forward. This spread is perfect for personal growth and understanding yourself better.\n\nWhen reading three-card spreads, pay attention to how the cards relate to each other. Do they tell a coherent story? Are there conflicting energies? Do the suits create a pattern? Major Arcana cards indicate significant life lessons, while Minor Arcana show day-to-day influences. Court cards often represent people or aspects of yourself.\n\nThe simplicity of three-card spreads makes them perfect for daily practice. You can do a quick reading each morning to set your intention for the day, or use them for specific questions throughout the day. They're also excellent for learning tarot, as you can focus on understanding each card's meaning without being overwhelmed by a complex layout.\n\nTo get the most from three-card spreads, formulate a clear question before you begin. The more specific your question, the clearer the answer will be. Shuffle your deck while focusing on your question, then draw three cards. Take time to reflect on each card individually before considering how they work together. The cards will tell a story—your job is to listen and interpret.\n\nRemember that three-card spreads, like all tarot readings, are tools for reflection and guidance. They show possibilities and potentials, not fixed outcomes. Use the insights to make informed decisions and navigate your path with greater awareness. The simplicity of three cards doesn't diminish their power—sometimes less is more.",
    relatedArticles: ["1", "8", "5"]
  },
  "8": {
    id: "8",
    title: "Chakra Balancing Practices",
    subtitle: "Align your energy centers for wellness",
    tag: "Wellness",
    category: "Meditation",
    content: "Chakras are energy centers in your body that correspond to different aspects of your physical, emotional, and spiritual well-being. There are seven main chakras, each located along your spine from the base to the crown of your head. When chakras are balanced and open, energy flows freely, promoting health and harmony. When they're blocked or imbalanced, you may experience physical, emotional, or spiritual issues.\n\nThe Root Chakra (Muladhara) is located at the base of your spine and relates to survival, security, and your connection to the physical world. When balanced, you feel grounded, secure, and stable. When imbalanced, you might experience fear, anxiety, or financial insecurity. To balance the root chakra, practice grounding exercises, spend time in nature, and focus on your physical needs. Red is the associated color, and the element is earth.\n\nThe Sacral Chakra (Svadhisthana) is located in your lower abdomen and governs creativity, sexuality, and emotions. When balanced, you experience healthy creativity, emotional expression, and sensual pleasure. When imbalanced, you might struggle with emotional instability, creative blocks, or intimacy issues. To balance the sacral chakra, engage in creative activities, honor your emotions, and practice healthy boundaries. Orange is the associated color, and the element is water.\n\nThe Solar Plexus Chakra (Manipura) is located in your upper abdomen and relates to personal power, will, and self-esteem. When balanced, you feel confident, empowered, and in control of your life. When imbalanced, you might experience low self-esteem, control issues, or difficulty making decisions. To balance the solar plexus chakra, practice self-empowerment, set healthy boundaries, and build confidence. Yellow is the associated color, and the element is fire.\n\nThe Heart Chakra (Anahata) is located in your chest and governs love, compassion, and connection. When balanced, you experience unconditional love, compassion for yourself and others, and healthy relationships. When imbalanced, you might struggle with giving or receiving love, grief, or relationship issues. To balance the heart chakra, practice self-love, forgiveness, and acts of kindness. Green (or pink) is the associated color, and the element is air.\n\nThe Throat Chakra (Vishuddha) is located in your throat and relates to communication, self-expression, and truth. When balanced, you communicate clearly, express yourself authentically, and speak your truth. When imbalanced, you might struggle with communication, fear of speaking up, or dishonesty. To balance the throat chakra, practice honest communication, creative expression, and active listening. Blue is the associated color, and the element is ether.\n\nThe Third Eye Chakra (Ajna) is located in your forehead and governs intuition, insight, and spiritual awareness. When balanced, you have clear intuition, inner wisdom, and spiritual connection. When imbalanced, you might experience confusion, lack of clarity, or disconnection from your intuition. To balance the third eye chakra, practice meditation, develop your intuition, and trust your inner guidance. Indigo is the associated color, and there's no associated element.\n\nThe Crown Chakra (Sahasrara) is located at the top of your head and relates to spirituality, enlightenment, and connection to the divine. When balanced, you experience spiritual connection, wisdom, and a sense of oneness. When imbalanced, you might feel disconnected from spirituality, closed-minded, or overly attached to material concerns. To balance the crown chakra, practice meditation, connect with your spiritual beliefs, and seek higher understanding. Violet or white is the associated color, and there's no associated element.\n\nChakra balancing practices include meditation, visualization, yoga, sound healing, and energy work. You can work with individual chakras that need attention or practice a full chakra balancing meditation that addresses all seven centers. Regular practice helps maintain balance and promotes overall well-being.\n\nRemember that chakra work is a journey, not a destination. Imbalances are normal and part of the human experience. The goal isn't perfection but awareness and ongoing balance. Listen to your body, honor your energy, and practice regularly to maintain healthy, flowing energy through all your chakras.",
    relatedArticles: ["3", "5", "1"]
  }
};

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const referrer = (location.state as { referrer?: string })?.referrer || "/discovery";
  
  const article = id ? articles[id] : null;

  if (!article) {
    return (
      <PageWrapper showBottomNav={true} showTabBar={false}>
        <BaseHeader
          title="Article Not Found"
          leftAction={{
            icon: <ChevronLeft className="w-5 h-5" />,
            onClick: () => navigate(referrer),
            label: "Back"
          }}
        />
        <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen pb-24">
          <main className="px-4 mt-4 pb-6 max-w-2xl mx-auto">
            <div className="liquid-glass-card rounded-[12px] p-6 text-center">
              <p className="text-body text-muted-foreground">This article could not be found.</p>
            </div>
          </main>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title={article.title}
        subtitle={article.category}
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate(referrer),
          label: "Back"
        }}
        rightActions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {/* Handle bookmark */}}
              className="apple-touch-target-comfortable p-2 rounded-[16px] transition-all duration-300 hover:bg-white/5"
              aria-label="Bookmark article"
            >
              <Bookmark className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
            </button>
            <button
              onClick={() => {/* Handle share */}}
              className="apple-touch-target-comfortable p-2 rounded-[16px] transition-all duration-300 hover:bg-white/5"
              aria-label="Share article"
            >
              <Share2 className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
            </button>
          </div>
        }
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen pb-24">
        <main className="px-4 mt-4 pb-12 max-w-2xl mx-auto space-y-4">
          {/* Hero Section - Compact */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-footnote font-medium border border-accent/30">
                {article.tag}
              </span>
              <h1 className="text-title-2 font-title font-medium text-foreground leading-tight">
                {article.title}
              </h1>
              <p className="text-subhead text-muted-foreground leading-relaxed">
                {article.subtitle}
              </p>
              <div className="flex items-center gap-2 text-caption-2 text-muted-foreground pt-2 border-t border-white/5">
                <span>{calculateReadingTime(article.content)}</span>
              </div>
            </div>
          </div>

          {/* Compact Image Placeholder - Much Smaller */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border">
            <ImagePlaceholder width="100%" height={200} category={article.category} className="rounded-[12px]" />
          </div>

          {/* Main Content - Better Spacing */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5">
            <div className="space-y-4">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-body text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="space-y-4 pt-4 pb-8">
              <h2 className="text-title-3 font-title font-medium text-foreground px-1">Related Articles</h2>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-0 pr-4">
                {article.relatedArticles.map((relatedId) => {
                  const related = articles[relatedId];
                  if (!related) return null;
                  return (
                    <div
                      key={related.id}
                      onClick={() => navigate(`/discovery/article/${related.id}`, { state: { referrer } })}
                      className="flex-shrink-0 w-[320px] h-[200px] flex apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6"
                    >
                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        {/* Subtle liquid glass highlight */}
                        <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                        
                        <div>
                          <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                            {related.category}
                          </span>
                          
                          <h3 className="text-[22px] font-title font-medium text-foreground leading-tight mt-4">{related.title}</h3>
                          <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">{related.subtitle}</p>
                        </div>
                        
                        {/* Decorative shimmer element */}
                        <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full liquid-glass-shimmer" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};

export default ArticleDetailPage;

