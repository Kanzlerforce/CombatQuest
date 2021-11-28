# CombatQuest

This is a NodeJS command line project for testing out combat mechanics similar to those found in the old NES game called Dragon Warrior. The combat mechanics are here: https://gamefaqs.gamespot.com/nes/563408-dragon-warrior/faqs/61640

## Player

```
Level  Strength   Agility     HP        MP

 1         4         4        15         0
 2         5         4        22         0
 3         7         6        24         5
 4         7         8        31        16
 5        12        10        35        20
 6        16        10        38        24
 7        18        17        40        26
 8        22        20        46        29
 9        30        22        50        36
10        35        31        54        40
11        40        35        62        50
12        48        40        63        58
13        52        48        70        64
14        60        55        78        70
15        68        64        86        72
16        72        70        92        95
17        72        78       100       100
18        85        84       115       108
19        87        86       130       115
20        92        88       138       128
21        95        90       149       135
22        97        90       158       146
23        99        94       165       153
24       103        98       170       161
25       113       100       174       161
26       117       105       180       168
27       125       107       189       175
28       130       115       195       180
29       135       120       200       190
30       140       130       210       200
```

## Enemies

These are all the stats of the enemies.

```
ID  Enemy Name     Str Agi HP  Pat SR  DR  XP  GP

00  Slime          05  03  03  00  0F  01  01  02
01  Red Slime      07  03  04  00  0F  01  01  03
02  Drakee         09  06  06  00  0F  01  02  03
03  Ghost          0B  08  07  00  0F  04  03  05
04  Magician       0B  0C  0D  02  00  01  04  0C
05  Magidrakee     0E  0E  0F  02  00  01  05  0C
06  Scorpion       12  10  14  00  0F  01  06  10
07  Druin          14  12  16  00  0F  02  07  10
```

## Combat

Strength is used in figuring out how much damage will be done to you.

Agility is used in figuring out how much damage will be reduced for the enemy,
and it is used to determine how hard it is for you to run away.

HP is how many hit points the enemy has, and this typically varies.

GP is how much gold will be awarded, and this typically varies.

### Enemy Combat Formulas

#### Melee

There are two formulas for attack damage for enemies.  The standard range is
from:

(EnemyStrength - HeroDefense / 2) / 4,

to:

(EnemyStrength - HeroDefense / 2) / 2

The hero's defense is equal to his agility / 2 rounded down, plus the modifiers
for his equipment.


The other type of attack happens if your defense power is greater than or equal
to the enemy's strength.  In that case, the range is from:

0

to:

(enemyStrength + 4) / 6

#### Melee Combat Example 1

Player:
4 agility
HeroDefense = floor(agi / 2) => 2

Enemy: 5 strength

Attack Damage Ranges:
    Low: (5 - 2 / 2) / 4 => (5 - 1) / 4 => 1
    High: (5 - 2 / 2) / 2 => (5 - 1) / 2 => 2

#### Melee Combat Example 2

Player:
10 agility
HeroDefense = floor(agi / 2) => 5

Enemy: 5 strength

Attack Damage Ranges:
    Low: 0
    High: (5 + 4) / 6 => 9 / 6 => 1.5
