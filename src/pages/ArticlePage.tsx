
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ArticleContent from '@/components/ArticleContent';

// Mock articles data
const articlesData = {
  // Featured Stories
  'rugpull-losses-soar-2025-crypto-scams': {
    title: "Rugpull Losses Soar 6,500% in 2025 as Crypto Scams Turn Deadlier, Nearly $6B Lost – DappRadar",
    content: `
      <p>The cryptocurrency space has seen an alarming rise in scam activity over the past year, with rugpull losses increasing by an unprecedented 6,500% according to a new report from DappRadar.</p>
      
      <p>The blockchain analytics firm reported that nearly $6 billion has been lost to various cryptocurrency scams in 2025 so far, with rugpulls being the most devastating type of attack.</p>
      
      <h2>What is a Rugpull?</h2>
      
      <p>A rugpull occurs when cryptocurrency developers abandon a project and run away with investors' funds. These scams typically involve creators dumping their token holdings, draining liquidity from trading pools, and disappearing without a trace.</p>
      
      <p>"The sophistication of these attacks has increased dramatically," said Pedro Herrera, Senior Blockchain Analyst at DappRadar. "Scammers are now employing complex technical mechanisms and elaborate marketing campaigns to appear legitimate before vanishing with user funds."</p>
      
      <h2>Most Affected Sectors</h2>
      
      <p>The report highlights that decentralized finance (DeFi) and non-fungible token (NFT) projects remain the most vulnerable to these types of scams. New blockchain ecosystems with less established security practices have also become frequent targets.</p>
      
      <p>The largest single rugpull in 2025 was the collapse of HyperYield Finance, which resulted in losses exceeding $740 million. The project promised unsustainable yields of up to 2% daily returns before its anonymous team disappeared overnight.</p>
      
      <h2>Warning Signs for Investors</h2>
      
      <p>DappRadar offers several recommendations for cryptocurrency investors to avoid falling victim to these increasingly sophisticated scams:</p>
      
      <ul>
        <li>Be wary of projects offering unusually high returns</li>
        <li>Research team members thoroughly, including verification of their identities</li>
        <li>Check if the project's smart contracts have been audited by reputable security firms</li>
        <li>Look for locked liquidity and token vesting schedules for team allocations</li>
        <li>Investigate tokenomics for potential red flags like excessive team allocations</li>
      </ul>
      
      <p>Regulatory bodies worldwide have taken notice of the increasing threat, with several major jurisdictions introducing new legislation specifically targeting cryptocurrency fraud.</p>
      
      <p>The report concludes that while the overall cryptocurrency market has matured significantly, the scam landscape continues to evolve in sophistication, requiring heightened vigilance from investors and stronger industry-wide security standards.</p>
    `,
    author: "Hassan Shittu",
    date: "April 18, 2025",
    category: "Crypto Scams",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    relatedArticles: [
      {
        id: 1,
        title: "What Trump's Attacks on Jerome Powell Could Mean for Crypto",
        slug: "trumps-attacks-jerome-powell-crypto",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      },
      {
        id: 2,
        title: "Why Bitcoin Might Be About to Turn Bullish Again",
        slug: "why-bitcoin-might-turn-bullish-again",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
      },
      {
        id: 3,
        title: "Crypto's Banking Battle: Are Regulators Going Too Far?",
        slug: "crypto-banking-battle-regulators",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
      }
    ]
  },
  'lyn-alden-bitcoin-higher-trump-tariff': {
    title: "Lyn Alden Says Bitcoin Would Be Higher if Not for Trump's Tariff Shock",
    content: `
      <p>Renowned financial strategist Lyn Alden believes that Bitcoin would be trading at significantly higher prices if not for the market uncertainty created by former President Donald Trump's recent comments on potential tariff implementations.</p>
      
      <p>In an exclusive interview with CryptoPulse, Alden explained that Bitcoin's current price action has been heavily influenced by macroeconomic factors, with Trump's proposed tariff policies creating substantial ripple effects throughout global markets.</p>
      
      <h2>Tariff Talks Spook Markets</h2>
      
      <p>"Bitcoin would likely be trading 20-30% higher right now if not for the tariff shock introduced by Trump's recent statements," Alden said. "The market is pricing in potential inflationary pressures and trade disruptions that could result from aggressive tariff policies."</p>
      
      <p>Trump recently suggested implementing blanket tariffs of up to 60% on Chinese imports and at least 10% on all other countries if elected, significantly higher than the rates imposed during his previous administration.</p>
      
      <p>This rhetoric has contributed to increased volatility across financial markets, with Bitcoin experiencing several sharp corrections despite its overall upward trajectory this year.</p>
      
      <h2>Long-Term Outlook Remains Bullish</h2>
      
      <p>Despite these short-term headwinds, Alden maintains a bullish long-term outlook on Bitcoin, citing several factors that should contribute to price appreciation over time:</p>
      
      <ul>
        <li>The upcoming Bitcoin halving event, which will reduce new supply issuance</li>
        <li>Continued institutional adoption through spot ETFs and corporate treasury allocations</li>
        <li>Banking system fragility revealed during recent regional banking crises</li>
        <li>Global de-dollarization trends accelerating in certain regions</li>
      </ul>
      
      <p>"Once we get past this period of trade policy uncertainty, I expect Bitcoin to resume its upward trajectory," Alden stated. "The fundamental adoption metrics remain strong, and the monetary policy environment still favors scarce assets."</p>
      
      <h2>Potential Winners and Losers</h2>
      
      <p>Alden also noted that while tariffs might create short-term volatility, they could eventually benefit Bitcoin in the longer term if they lead to increased inflation and currency debasement.</p>
      
      <p>"Ironically, the same policies creating headwinds now could become tailwinds later," she explained. "If aggressive tariffs lead to higher inflation and further monetization of government debt, Bitcoin's value proposition as an inflation hedge becomes even stronger."</p>
      
      <p>Financial markets will be closely watching how trade policy develops in the coming months, with Bitcoin's price action likely to remain sensitive to macroeconomic developments and geopolitical tensions.</p>
    `,
    author: "Ruholamin Haqshanas",
    date: "April 19, 2025",
    category: "Bitcoin News",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    relatedArticles: [
      {
        id: 1,
        title: "Trump's Return Could Ignite Crypto Market Growth, CleanSpark CEO Predicts After SEC Shift",
        slug: "trump-return-ignite-crypto-market-growth",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      },
      {
        id: 2,
        title: "What Trump's Attacks on Jerome Powell Could Mean for Crypto",
        slug: "trumps-attacks-jerome-powell-crypto",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      },
      {
        id: 3,
        title: "Why Bitcoin Might Be About to Turn Bullish Again",
        slug: "why-bitcoin-might-turn-bullish-again",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
      }
    ]
  },
  'why-bitcoin-might-turn-bullish-again': {
    title: "Why Bitcoin Might Be About to Turn Bullish Again",
    content: `
      <p>After several weeks of sideways trading and declining volatility, Bitcoin may be on the verge of resuming its bullish trend, according to a convergence of technical indicators and on-chain metrics.</p>
      
      <p>The leading cryptocurrency has consolidated around the $72,000 level following its all-time high of $88,750 reached in March. This consolidation phase has led many to question whether Bitcoin's current market cycle has peaked or if there's more upside potential ahead.</p>
      
      <h2>Technical Analysis Points to Potential Breakout</h2>
      
      <p>Several technical indicators suggest that Bitcoin could be preparing for another leg up:</p>
      
      <ul>
        <li>The weekly Relative Strength Index (RSI) has reset to neutral levels after being overbought, creating room for another rally</li>
        <li>Bitcoin has formed a bull flag pattern on the daily chart, often a continuation pattern in strong uptrends</li>
        <li>The 50-day moving average has provided consistent support during this consolidation</li>
        <li>Volume profiles show significant accumulation occurring at current price levels</li>
      </ul>
      
      <p>"What we're seeing is a classic mid-cycle consolidation," explains Sarah Rodriguez, technical analyst at CryptoQuant. "Bitcoin tends to have these pauses during bull markets before continuing higher."</p>
      
      <h2>On-Chain Metrics Show Strength</h2>
      
      <p>Beyond technical analysis, on-chain metrics paint a picture of strong network fundamentals:</p>
      
      <ul>
        <li>Exchange outflows continue to exceed inflows, indicating accumulation rather than distribution</li>
        <li>Long-term holder supply has reached an all-time high of 13.5 million BTC</li>
        <li>Mining hash rate continues setting new records, reflecting confidence in the network</li>
        <li>Realized cap to market cap ratio remains below previous cycle peaks, suggesting room for growth</li>
      </ul>
      
      <p>These metrics collectively suggest that Bitcoin's current price action is more consistent with a mid-cycle consolidation than a market top.</p>
      
      <h2>Macroeconomic Backdrop Remains Supportive</h2>
      
      <p>The broader macroeconomic environment also provides tailwinds for Bitcoin's potential resurgence:</p>
      
      <p>"The Federal Reserve's hesitance to cut rates aggressively amid persistent inflation creates an environment where scarce assets like Bitcoin tend to outperform," notes Connor Sephton, macroeconomic analyst. "Additionally, ongoing geopolitical tensions and sovereign debt concerns continue to highlight Bitcoin's value proposition as a neutral, borderless store of value."</p>
      
      <p>While short-term price action remains unpredictable, the combination of technical setups, strong on-chain fundamentals, and a supportive macro backdrop suggests that Bitcoin's next major move could be to the upside, potentially testing new all-time highs in the coming months.</p>
      
      <p>As always, market participants should remember that cryptocurrency investments carry significant risk, and past performance does not guarantee future results.</p>
    `,
    author: "Connor Sephton",
    date: "April 17, 2025",
    category: "Bitcoin Analysis",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    relatedArticles: [
      {
        id: 1,
        title: "The Bitcoin 'Honeymoon' May Be Over. Here's Why",
        slug: "bitcoin-honeymoon-may-be-over",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
      },
      {
        id: 2,
        title: "Lyn Alden Says Bitcoin Would Be Higher if Not for Trump's Tariff Shock",
        slug: "lyn-alden-bitcoin-higher-trump-tariff",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
      },
      {
        id: 3,
        title: "Trump's Return Could Ignite Crypto Market Growth, CleanSpark CEO Predicts After SEC Shift",
        slug: "trump-return-ignite-crypto-market-growth",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      }
    ]
  },
  // Add more article content here for other slugs
  'trumps-attacks-jerome-powell-crypto': {
    title: "What Trump's Attacks on Jerome Powell Could Mean for Crypto",
    content: `
      <p>Former President Donald Trump's recent criticisms of Federal Reserve Chair Jerome Powell have sent ripples through financial markets, with potential implications for cryptocurrency valuations and adoption.</p>
      
      <p>In a series of statements, Trump has sharply criticized Powell's monetary policy decisions, suggesting he would replace the Fed Chair if elected in November. These comments have raised questions about the future direction of U.S. monetary policy and its impact on digital assets.</p>
      
      <h2>Political Pressure on the Fed</h2>
      
      <p>Trump's criticisms center on Powell's approach to inflation and interest rates, with the former president claiming the Fed has been too slow to cut rates despite cooling inflation data.</p>
      
      <p>"Jerome Powell should be ashamed of himself," Trump stated at a recent campaign event. "He's keeping rates artificially high, hurting American businesses and workers. I made him Fed Chair, which was a mistake, and I would not keep him in that position."</p>
      
      <p>This political pressure on the traditionally independent Federal Reserve has created uncertainty in markets, with investors trying to gauge how potential changes at the Fed might affect monetary policy.</p>
      
      <h2>Implications for Crypto Markets</h2>
      
      <p>Cryptocurrency markets have historically shown sensitivity to Federal Reserve policy, with Bitcoin and other digital assets often reacting strongly to interest rate decisions and liquidity conditions.</p>
      
      <p>Several potential scenarios could emerge from the current situation:</p>
      
      <h3>1. Accelerated Rate Cuts</h3>
      
      <p>If political pressure results in faster or deeper rate cuts than markets currently expect, this could provide a significant boost to risk assets, including cryptocurrencies. Lower rates reduce the opportunity cost of holding non-yielding assets like Bitcoin and can increase liquidity flowing into crypto markets.</p>
      
      <h3>2. Policy Uncertainty Premium</h3>
      
      <p>"One immediate effect we're seeing is the pricing in of a policy uncertainty premium," explains Connor Sephton, macroeconomic analyst. "Markets dislike unpredictability, and the potential for abrupt changes in Fed leadership or mandate could drive investors toward assets perceived as insulated from political interference – a narrative that may benefit Bitcoin."</p>
      
      <h3>3. Dollar Debasement Concerns</h3>
      
      <p>Trump has previously advocated for a weaker dollar to boost U.S. exports. If his criticisms of Powell signal a potential shift toward policies that might debase the dollar, this could strengthen the case for cryptocurrencies as an alternative store of value.</p>
      
      <h2>Long-term Structural Implications</h2>
      
      <p>Beyond short-term market reactions, the political targeting of the Federal Reserve raises deeper questions about central bank independence – a core issue that inspired Bitcoin's creation following the 2008 financial crisis.</p>
      
      <p>"The very public challenging of Fed independence, regardless of which political party does it, ultimately strengthens the fundamental value proposition of decentralized monetary systems," notes Dr. Amanda Chen, professor of financial systems at Columbia University. "It reminds market participants why Satoshi created Bitcoin in the first place."</p>
      
      <p>As the election approaches, market participants will be closely monitoring both the rhetoric around the Federal Reserve and Powell's actual policy decisions. The resulting monetary environment will likely play a significant role in determining cryptocurrency market trends through 2025 and beyond.</p>
    `,
    author: "Connor Sephton",
    date: "April 16, 2025",
    category: "Macroeconomics",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    relatedArticles: [
      {
        id: 1,
        title: "Lyn Alden Says Bitcoin Would Be Higher if Not for Trump's Tariff Shock",
        slug: "lyn-alden-bitcoin-higher-trump-tariff",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
      },
      {
        id: 2,
        title: "Trump's Return Could Ignite Crypto Market Growth, CleanSpark CEO Predicts After SEC Shift",
        slug: "trump-return-ignite-crypto-market-growth",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      },
      {
        id: 3,
        title: "Why Bitcoin Might Be About to Turn Bullish Again",
        slug: "why-bitcoin-might-turn-bullish-again",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
      }
    ]
  },
  'crypto-banking-battle-regulators': {
    title: "Crypto's Banking Battle: Are Regulators Going Too Far?",
    content: `
      <p>The relationship between cryptocurrency companies and traditional banking institutions has grown increasingly strained in recent months, as regulatory pressures have led to account closures, payment processing difficulties, and limited access to financial services for crypto businesses.</p>
      
      <p>This escalating conflict raises important questions about the appropriate balance between regulatory oversight and innovation in the financial sector.</p>
      
      <h2>The Current Banking Landscape for Crypto</h2>
      
      <p>Cryptocurrency companies across the United States and Europe have reported widespread difficulties in maintaining banking relationships:</p>
      
      <ul>
        <li>Several major banks have implemented blanket policies against serving cryptocurrency businesses</li>
        <li>Payment processors have terminated relationships with crypto exchanges and service providers</li>
        <li>Even companies with strong compliance programs have faced account closures with little explanation</li>
        <li>Banking options have consolidated to a handful of crypto-friendly institutions, creating systemic risk</li>
      </ul>
      
      <p>"We've invested millions in our compliance program, follow all applicable regulations, and still had our accounts closed by three different banks in the past year," said the CEO of a mid-sized cryptocurrency exchange who requested anonymity. "Each time, we received vague explanations about 'risk appetite' rather than any specific compliance concerns."</p>
      
      <h2>The Regulatory Pressure Campaign</h2>
      
      <p>Industry observers point to behind-the-scenes regulatory pressure as a key driver of these banking challenges.</p>
      
      <p>"What we're witnessing is a coordinated approach by certain regulatory bodies to pressure banks through supervisory channels," explains Daniel Richards, former banking regulator and current crypto policy analyst. "Instead of establishing clear rules through proper administrative procedures, some agencies are using bank examinations and informal guidance to create a de facto ban on crypto banking."</p>
      
      <p>This approach, often referred to as "regulation by enforcement" or "Operation Choke Point 2.0" by critics, has drawn scrutiny for potentially circumventing proper rulemaking procedures and congressional oversight.</p>
      
      <h2>The Case for Regulatory Caution</h2>
      
      <p>Regulators and banking industry representatives defend the cautious approach to cryptocurrency firms:</p>
      
      <ul>
        <li>Volatility in crypto markets can create liquidity and solvency risks for banking partners</li>
        <li>Money laundering and fraud concerns remain elevated in parts of the cryptocurrency sector</li>
        <li>The collapse of crypto-focused banks like Silvergate highlights potential contagion risks</li>
        <li>Regulatory frameworks for digital assets remain incomplete in many jurisdictions</li>
      </ul>
      
      <p>"Banks have a responsibility to manage risk prudently and protect the broader financial system," said Elizabeth Morrison, spokesperson for the American Bankers Association. "The heightened scrutiny of cryptocurrency relationships reflects legitimate risk concerns, not an ideological position against innovation."</p>
      
      <h2>Finding the Right Balance</h2>
      
      <p>As this conflict continues, several approaches could help establish a more sustainable relationship between the banking and cryptocurrency sectors:</p>
      
      <ul>
        <li>Clear regulatory guidelines that distinguish between different types of crypto activities and their risk profiles</li>
        <li>Transition from ambiguous supervisory pressure to formal, transparent rulemaking</li>
        <li>Risk-based assessment frameworks that evaluate individual crypto businesses rather than applying blanket policies</li>
        <li>Public-private collaboration on compliance standards specifically designed for digital asset businesses</li>
      </ul>
      
      <p>"Responsible innovation requires clear rules of the road," Richards argues. "The current approach forces legitimate crypto businesses offshore while failing to address actual risks to the financial system."</p>
      
      <p>As policymakers, banks, and cryptocurrency companies navigate this complex landscape, finding an appropriate regulatory balance will be essential for maintaining American competitiveness in financial innovation while protecting consumers and the broader financial system.</p>
    `,
    author: "Daniel Richards",
    date: "April 15, 2025",
    category: "Regulation",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    relatedArticles: [
      {
        id: 1,
        title: "Coinbase Faces Déjà Vu: Oregon AG 'Revives' SEC Allegations in High-Stakes State Suit",
        slug: "coinbase-faces-deja-vu-oregon-ag",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
      },
      {
        id: 2,
        title: "Trump's Return Could Ignite Crypto Market Growth, CleanSpark CEO Predicts After SEC Shift",
        slug: "trump-return-ignite-crypto-market-growth",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      },
      {
        id: 3,
        title: "Sam Bankman-Fried Moved to Notorious LA Prison That Housed Al Capone, Charles Manson",
        slug: "sam-bankman-fried-moved-notorious-prison",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
      }
    ]
  },
  // Adding more article demo content for other slugs  
  'bitcoin-honeymoon-may-be-over': {
    title: "The Bitcoin 'Honeymoon' May Be Over. Here's Why",
    content: `
      <p>The euphoria surrounding Bitcoin's recent price surge and the approval of spot ETFs may be giving way to a more sober market phase, as several indicators suggest the initial "honeymoon period" could be drawing to a close.</p>
      
      <p>Since reaching an all-time high above $88,000 in March, Bitcoin has struggled to maintain momentum despite seemingly favorable market conditions and continued institutional inflows.</p>
      
      <h2>ETF Flow Dynamics Shifting</h2>
      
      <p>Bitcoin spot ETFs, which launched in January to great fanfare, have seen their net inflow patterns change significantly in recent weeks:</p>
      
      <ul>
        <li>Daily inflows have decreased from an average of $500 million in February to under $100 million in April</li>
        <li>Several trading sessions have seen net outflows, particularly during market volatility</li>
        <li>The rate of new institutional participation appears to be slowing</li>
      </ul>
      
      <p>"We're seeing a natural maturation of the ETF market," explains Jeffrey Green, digital asset strategist. "The initial pent-up demand has been satisfied, and now flows are becoming more tactical rather than purely accumulative."</p>
      
      <p>This shift suggests that the market may need to find new catalysts beyond the ETF narrative that has dominated the past several months.</p>
      
      <h2>Market Structure Concerns</h2>
      
      <p>Beyond ETF flows, changes in market structure point to potential challenges ahead:</p>
      
      <ul>
        <li>Futures open interest has declined significantly from March peaks</li>
        <li>Options skew has shifted towards put protection</li>
        <li>Funding rates on perpetual futures have normalized after extended periods of positive funding</li>
        <li>Whale wallet activity shows increased distribution rather than accumulation</li>
      </ul>
      
      <p>"What we're witnessing is a classic transition from the momentum phase to a more value-driven market," notes Dr. Lisa Chen, cryptocurrency researcher. "After strong uptrends, markets typically need time to digest gains and establish new equilibrium ranges."</p>
      
      <h2>Macro Headwinds Increasing</h2>
      
      <p>The broader macroeconomic environment has also become more challenging for risk assets like Bitcoin:</p>
      
      <ul>
        <li>Treasury yields have risen significantly, increasing the opportunity cost of holding non-yielding assets</li>
        <li>Inflation has proven more persistent than expected, potentially delaying Fed rate cuts</li>
        <li>Geopolitical tensions have elevated market uncertainty</li>
        <li>Technical recession indicators have grown more concerning</li>
      </ul>
      
      <p>"Bitcoin has benefited greatly from anticipation of a dovish Fed pivot," Green explains. "As that timeline gets pushed back, we're seeing a repricing of risk assets across the board."</p>
      
      <h2>The Path Forward</h2>
      
      <p>While these factors suggest the easy gains of early 2025 may be behind us, several potential catalysts could reignite Bitcoin's momentum:</p>
      
      <ul>
        <li>The upcoming halving event in April, which will reduce new supply issuance</li>
        <li>Potential regulatory clarity, particularly around stablecoin legislation</li>
        <li>New institutional adoption announcements beyond ETFs</li>
        <li>Actual implementation of Fed rate cuts later in the year</li>
      </ul>
      
      <p>"Markets rarely move in straight lines," Green concludes. "This consolidation phase is perfectly normal after such a strong advance and doesn't necessarily invalidate the longer-term bull market thesis. However, investors should adjust their expectations for more measured gains and increased volatility in the coming months."</p>
    `,
    author: "Jeffrey Green",
    date: "April 14, 2025",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    relatedArticles: [
      {
        id: 1,
        title: "Why Bitcoin Might Be About to Turn Bullish Again",
        slug: "why-bitcoin-might-turn-bullish-again",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
      },
      {
        id: 2,
        title: "Lyn Alden Says Bitcoin Would Be Higher if Not for Trump's Tariff Shock",
        slug: "lyn-alden-bitcoin-higher-trump-tariff",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
      },
      {
        id: 3,
        title: "What Trump's Attacks on Jerome Powell Could Mean for Crypto",
        slug: "trumps-attacks-jerome-powell-crypto",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      }
    ]
  }
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articlesData[slug] : null;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!article) {
    return (
      <Layout title="Article Not Found">
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout
      title={article.title}
      description={article.content.substring(0, 160).replace(/<\/?[^>]+(>|$)/g, "")}
      ogImage={article.image}
      ogType="article"
    >
      <ArticleContent {...article} />
    </Layout>
  );
};

export default ArticlePage;
