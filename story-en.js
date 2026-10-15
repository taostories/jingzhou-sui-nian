// English narrative. Speaker IDs stay unchanged so portrait and story logic are shared.
const storyEn = {
  opening: [
    'In 208 CE, the thirteenth year of Jian’an, fertile land and stable government made Jingzhou a refuge amid the turmoil of the late Han. Families fled south, markets flourished, and learning took root. Countless ordinary people built peaceful lives here.',
    'But war in the north was drawing closer. Beneath Jingzhou’s quiet surface, uncertainty was already stirring.'
  ],
  acts: [
    {
      title:'Peace along the River', period:'Spring · 208 CE', scene:'market', game:'The Windswept Market',
      lines:[
        ['江伯','A sudden gust scattered the goods on my stall. Help me find them, would you? This brocade, pottery granary, and bamboo manuscript carry the skills and learning passed down here in Jingchu.'],
        ['阿荆','Jingzhou has been peaceful for years. The markets thrive, and people live securely. I always thought days like these would last forever.'],
        ['江伯','The realm is still unsettled. Peace is never certain. Remember this: the world may change, but our cultural traditions need not disappear.']
      ],
      gameIntro:[
        ['江伯','Let us gather the scattered goods. Check the pattern of the brocade, the shape of the pottery granary, and the cords binding the bamboo slips. Do not confuse them with someone else’s wares.'],
        ['阿荆','I will remember. I will search the stalls carefully and bring back all three.']
      ],
      after:[
        ['阿荆','Our wares, our prosperity, our markets... If the city falls, will all of them vanish?'],
        ['江伯','Objects can be broken and the land laid waste. But people who remember the skills and preserve our traditions will endure.']
      ],
      fact:'Under Liu Biao, Jingzhou sheltered displaced families, supported farming and silk production, and promoted education. It became a cultural refuge from the wars of the Central Plains.',
      mood:'A Jing believes prosperity will last forever. He cannot yet imagine traditions surviving the loss of physical objects.'
    },
    {
      title:'A Homeland in Upheaval', period:'Autumn · 208 CE', scene:'shore', game:'The Riverside Path',
      lines:[
        ['旅人','Cao Cao’s army has broken through Xiangyang! Jiangling is in danger. Leave now, before it is too late!'],
        ['阿荆','Our peaceful homeland has fallen apart overnight. I have no home to turn to. I can only cross the river with you and flee.'],
        ['江伯','War has no pity for our homeland or for ordinary people. We cannot carry our fields and houses away. But memories, skills, and traditions can travel with us and survive.']
      ],
      gameIntro:[
        ['江伯','The boat is at the landing downstream. The heavy wagons will not move, but you can push the empty baskets. Use the plank by the bank to bridge the gap. Look carefully before you go.'],
        ['阿荆','I will keep our belongings safe and follow the bank to meet you at the landing.']
      ],
      after:[
        ['阿荆','Peace is so fragile. Prosperity, homes, and possessions can disappear in a moment. If everyone is scattered, can our traditions really survive?'],
        ['江伯','Where the people go, their roots go with them.']
      ],
      fact:'Cao Cao’s southern campaign in 208 CE shook Jingzhou. Large numbers of civilians fled south along the river, bringing Jingchu’s farming practices, weaving skills, and local customs into Jiangnan.',
      mood:'His youthful certainty breaks. For the first time, A Jing understands how briefly peace may last.'
    },
    {
      title:'Flames at Red Cliffs', period:'Winter · 208 CE', scene:'redcliff', game:'Ships in the Night',
      lines:[
        ['阿荆','Look at that vast fleet. Once the fighting spreads, houses will fall and our belongings will burn. I fear everything Jingchu has passed down will be lost.'],
        ['江伯','Fire can destroy possessions, but it cannot erase the human will to pass things on. Lands change hands. A civilization endures because each generation keeps its inheritance alive.']
      ],
      gameIntro:[
        ['江伯','The darkness hides the whole scene. Follow the shoreline, the ripples, and the silhouettes of the boats. Piece them together, and you will see how the fleets lie on the river.'],
        ['阿荆','Linked ships on the north bank, boat shadows to the south... I will look again and put the scene together.']
      ],
      after:[['阿荆','Now I understand. Cities can fall, prosperity can fade, and objects can be destroyed. What endures is the knowledge held in people’s hearts and the skills passed from hand to hand.']],
      fact:'The Battle of Red Cliffs halted the northern advance and reshaped the late Han political landscape. Despite the destruction of war, Jingchu culture survived and spread as people migrated.',
      mood:'A Jing no longer equates civilization with its objects. He begins to understand the people who keep it alive.'
    },
    {
      title:'A Divided Jingzhou', period:'209 CE · After the Battle', scene:'afterwar', game:'Reading the New Map',
      lines:[
        ['江伯','The turmoil is not over. Every power now covets Jingzhou. The banners above its walls keep changing, yet ordinary people still farm, live, and keep their hearths burning.'],
        ['阿荆','I understand at last. Heroes fight over the land of their own time; ordinary people preserve traditions across the centuries. Wealth and borders are fleeting. What people pass on is civilization’s true foundation.']
      ],
      gameIntro:[
        ['江伯','Before you travel into Jiangnan, you must understand the lands along the way. The old map no longer shows who holds each place. Let us check the reports we have heard.'],
        ['阿荆','We will start with Xiangyang, Jiangling, and Gong’an. I will record who holds each city before I pack for the journey.']
      ],
      after:[],
      fact:'Although Jingzhou endured division and unrest, Jingchu’s regional traditions continued to absorb new influences and develop, becoming an important part of China’s cultural heritage.', mood:''
    }
  ],
  farewell:[
    ['江伯','I am old now. I have spent my life ferrying people across this river. I will remain beside its waters for the years I have left.'],
    ['阿荆','I no longer need our homeland to look as it once did. I will take Jingchu’s weaving skills, farming knowledge, and written learning into the villages of Jiangnan. I will cultivate new land, teach others, and help our traditions take root and grow.']
  ],
  note:'The boat left the bank, and Uncle Jiang’s figure faded into the river mist. Holding the bamboo manuscript close, A Jing set out for Jiangnan. The years ahead would be his chance to fulfill his promise.',
  endings:[
    'A Jing made a home in a Jiangnan village. With his neighbors, he repaired houses and cleared fields, drawing on his father’s farming lessons while learning the local soil and seasons. The first harvest was small, but it left seeds for another year.',
    'Between farming seasons, he learned from a weaver from his homeland. Together with his new neighbors, he recreated Jingchu patterns from memory. Cloth became clothing, grain filled the stores, and familiar skills took root in daily life.',
    'A Jing sorted the bamboo manuscripts he had brought, learned from the villagers, and taught children to read. By lamplight, he told them about Jiangling’s markets, the river’s boatmen, and the kindness people had shown one another while fleeing war.',
    'Uncle Jiang stayed at the old landing. Passing boats sometimes carried news that each was safe. A Jing sent word: the fields had yielded grain, and children’s reading could be heard in the village. Where the people went, their roots went with them.',
    'Years passed, and A Jing’s temples turned gray. The children who had heard his stories grew up to farm, weave, and teach new children. He never forgot Jingzhou, but Jiangnan had become home too. The boy who crossed the river had become a keeper of memory.',
    'A seed, a thread, a scroll: carried by ordinary people, they took root and mingled with the traditions of new places. China’s cultural heritage endures through these quiet acts of care.',
    'Listen to the crafts and stories of your own hometown. Learn them, then share them with those who come after you. May the stories of China live on through our generation. May the rivers and mountains endure, and each passing year bring peace.'
  ]
};
