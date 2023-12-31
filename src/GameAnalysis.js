import React, { useState } from 'react';
import initialIngredients from './initialIngredients.json';
import trucks from './trucks.json';
import { checkCompleteCombos, createIngredientDictionary, processComboLine,calculateTotalIngredients } from './App.js';
import { Card, CardContent, Typography, List, ListItem, Grid } from '@mui/material';

const ROUNDS = 14;


export default function GameAnalysisComponent() {


    const playerProfiles = createPlayerProfiles();
    const initialSelectedProfiles = playerProfiles.reduce((acc, profile, index) => {
        acc[profile.truckName] = index < 10; // True for first 10, false for the rest
        return acc;
    }, {});

    const [analysisResult, setAnalysisResult] = useState(null);
    const [selectedProfiles, setSelectedProfiles] = useState(initialSelectedProfiles);

    const handleRunAnalysis = () => {
        // Filter the profiles based on selected state
        const profilesToAnalyze = playerProfiles.filter(profile => selectedProfiles[profile.truckName]);
        const result = runAnalysis(profilesToAnalyze);
        console.log(result)
        setAnalysisResult(result);
    };

    const handleCheckboxChange = (truckName) => {
        setSelectedProfiles(prev => ({
            ...prev,
            [truckName]: !prev[truckName]
        }));
    };

    return (
        <div style={{ color: "white", height: "90vh", overflow: "scroll" }}>
            <h2>Game Analysis</h2>
            <div>
                {playerProfiles.map(profile => (
                    <div key={profile.truckName}>
                        <input
                            type="checkbox"
                            checked={!!selectedProfiles[profile.truckName]}
                            onChange={() => handleCheckboxChange(profile.truckName)}
                        />
                        {profile.truckName} ---- ({profile.strategy.join(', ')})
                    </div>
                ))}
            </div>
            <button onClick={handleRunAnalysis}>Run Analysis</button>
            <div>
                {analysisResult && <GameResultsDisplay gameResults={analysisResult} />}
                {analysisResult ? <pre>{JSON.stringify(analysisResult, null, 2)}</pre> : 'No analysis data yet.'}
            </div>
        </div>
    );
}

const createPlayerProfiles = () => {
    return [
        {
            truckName: "Sweet",
            strategy: ["Milskshake", "Gelato", "Chutney", "Grilled banana","Chili Mayo", "Shrimp-Fried Rice", "Coleslaw"]
        },
        {
            truckName: "Turbo Burgers1",
            strategy: ["Burgers!", "Fries", "Flexitarian Burgers", "Halloumi Burger", "Pickles", "Chutney",]
        },
        {
            truckName: "Forgotten",
            strategy: ["Coleslaw", "Vegan BBQ", "Creamy Sides", "Eggplant Parmesan", "BBQ Platter","Choco bananas","Onion Rings", "BBQ Beans", "Vegan BBQ",]
        },
        {
            truckName: "Taco o Plomo 1",
            strategy: ["Taco Mix", "Fish Taco", "Burrito", "Quesedilla", "Pineapple Express", "Fish Taco", "BBQ Platter", "BBQ Beans", "Vegan BBQ",]
        },
        {
            truckName: "Turbo Burgers2",
            strategy: ["Burgers!", "Pickles", "Flexitarian Burgers", "Taco Mix", "Fish Taco", "Fries", "Burrito", "Quesedilla", "Pineapple Express", "Fish Taco", "BBQ Platter", "BBQ Beans", "Vegan BBQ",]
        },

        {
            truckName: "The Eat Indian Company 1",
            strategy: [ "Curry Curry", "Creamy Sides", "Shrimp-Fried Rice", "Coleslaw", "Burgers!"]
        },
        {
            truckName: "The Eat Indian Company 2",
            strategy: ["Curry Curry", "Creamy Sides", "Shrimp-Fried Rice", "Coleslaw", , "Soy-Glazed Mushrooms"]
        },
        // {
        //     truckName: "The Eat Indian Company 3",
        //     strategy: ["Burgers!", "Curry Curry", "Creamy Sides", "Shrimp-Fried Rice", "Coleslaw", , "Soy-Glazed Mushrooms"]
        // },
        {
            truckName: "Bao East 1",
            strategy: ["Hoisin sauce", "Taco Mix", "Bao Dream", "Taco Mix", "Fish Taco", "Soy-Glazed Mushrooms", "Burrito", "Quesedilla", "Pineapple Express", "Fish Taco", "BBQ Platter", "BBQ Beans", "Vegan BBQ",]
        },
        {
            truckName: "Bao East 2",
            strategy: ["Spring Rolls", "Taco Mix", "Coleslaw", "Chili Mayo", "Bao Dream", "Taco Mix", "BBQ Platter", "BBQ Beans", "Vegan BBQ",]
        },
        {
            truckName: "Grilluminati's BBQ 3",
            strategy: ["BBQ Platter", "Taco Mix", , "Soy-Glazed Mushrooms","Tandoori Skewers", "Creamy Sides", "BBQ Beans", "Shrimp-Fried Rice", "Coleslaw"]
        },

        {
            truckName: "Vini Vidi Pasta 4",
            strategy: ["Pasti", "Eggplant Parmesan", "Creamy Sides", "Coleslaw", "Chili Mayo", "Shrimp-Fried Rice", "Coleslaw"]
        },

        {
            truckName: "Turbo Burgers3",
            strategy: ["Burgers!", "Pickles", "Flexitarian Burgers", "Taco Mix", "Fish Taco", "Fries", "Burrito", "Quesedilla", "Pineapple Express", "Fish Taco", "BBQ Platter", "BBQ Beans", "Vegan BBQ",]
        },
        {
            truckName: "BASE Turbo Burgers",
            strategy: ["Burgers!", "Fries", "Flexitarian Burgers", "Pickles", "Onion Rings", "Milkshake"]
          },
          {
            truckName: "BASE Taco o Plomo",
            strategy: ["Taco Mix", "Elotes", "Burrito", "Quesedilla", "Guacamole", "Pineapple Express", "Fish Taco"]
          },
          {
            truckName: "BASE The Eat Indian Company",
            strategy: ["Curry Curry", "Samosas", "Tandoori Skewers", "Chutney"]
          },
          {
            truckName: "BASE Bao East",
            strategy: ["Bao Dream", "Hoisin sauce", "Chili Mayo", "Spring Rolls"]
          },
          {
            truckName: "BASE  Grilluminati's BBQ",
            strategy: ["BBQ Platter", "BBQ Beans", "Vegan BBQ", "Creamy Sides", "Shrimp-Fried Rice", "Coleslaw"]
          },
          {
            truckName: "BASE Vini Vidi Pasta",
            strategy: ["Pasti", "Eggplant Parmesan", "Gelato"]
          },
          {
            truckName: "Sweet 2",
            strategy: ["Milskshake", "Gelato", "Chutney", "Chili Mayo", "Shrimp-Fried Rice", "Coleslaw", "Soy-Glazed Mushrooms"]
        },
        {
            truckName: "Sweet 3",
            strategy: ["Milskshake", "Gelato", "Chutney", "Chili Mayo", "Shrimp-Fried Rice", "Coleslaw"]
        },

    ];
};



function generateGameResults(deck, playersHands, playerProfiles) {
    // Getting items with value > 0 and their quantities

    const { totalIngredients, levelCount, rarityCount, rarityTypeCount } =calculateTotalIngredients();
    const availableItems = Object.entries(deck)
        .filter(([key, value]) => value > 0)
        .map(([key, value]) => ({ [key]: value }));



    const results = playerProfiles.map((profile, index) => {
        const hand = playersHands[index];
        const [completedCombos, totalScore] = combosFromHand(hand);
        return {
            profile,
            totalScore: totalScore,
            handCount: hand.length,
            hand,
            completedCombos
        };
    });

   
    const scores = results.map(result => result.totalScore);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const minScoreValue = Math.min(...scores);
    const maxScoreValue = Math.max(...scores);
    const minScore = results.reduce((acc, result) =>
    (result.totalScore === minScoreValue && (!acc || result.totalScore < acc.totalScore)) ? result.profile : acc, null);

    const maxScore = results.reduce((acc, result) =>
    (result.totalScore === maxScoreValue && (!acc || result.totalScore > acc.totalScore)) ? result.profile : acc, null);


    // Aggregate combo completion data
    const allUniqueCombos = [...new Set(trucks.flatMap(truck => truck.combos.map(combo => combo.ComboName)))];
    const comboStats = allUniqueCombos.reduce((acc, combo) => {
        acc[combo] = 0;
        return acc;
    }, {});

    // Update comboStats with completed combo counts
    results.forEach(result => {
        result.completedCombos.forEach(combo => {
            comboStats[combo] += 1;
        });
    });

    // Extract all unique wish ingredients
    const allWishIngredients = playerProfiles.flatMap(profile => profile.wishIngredients ?? []);
    const uniqueWishIngredients = [...new Set(allWishIngredients)];

    // Add the availableItems to the results
    return {
        availableItemsInDeck: availableItems,
        meta: { cardsLeft: availableItems.length, totalPlayers: playerProfiles.length,totalIngredients:totalIngredients,levelCount:levelCount,rarityCount:rarityCount,rarityTypeCount:rarityTypeCount },
        playerResults: results,
        scoreStats: { averageScore, minScore: minScore.truckName+" "+minScoreValue, maxScore: maxScore.truckName+" "+maxScoreValue },
        comboStats,
        uniqueWishIngredients

    };
}

const GameResultsDisplay = ({ gameResults }) => {
    const renderItemsList = (items, isCombo = false) => (
        <Grid container spacing={2}>
            {items.map((item, index) => (
                <Grid item key={index} xs={isCombo ? 6 : 12} sm={isCombo ? 3 : 6} md={2}>
                    <ListItem>
                        {Object.keys(item)[0]}{isCombo ? '' : `: ${item[Object.keys(item)[0]]}`}
                    </ListItem>
                </Grid>
            ))}
        </Grid>
    );

    const renderWishIngredients = ingredients => {
        const uniqueIngredients = new Set(ingredients);
        return (
            <Grid container spacing={2}>
                {[...uniqueIngredients].map((ingredient, index) => (
                    <Grid item key={index} xs={6} sm={3} md={2}>
                        <ListItem>{ingredient}</ListItem>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5">Available Items in Deck {gameResults?.meta?.cardsLeft} from total {gameResults?.meta?.totalPlayers} players and {JSON.stringify(gameResults?.meta?.totalIngredients)} ingredients and {JSON.stringify(gameResults?.meta?.rarityCount)} rarities and {JSON.stringify(gameResults?.meta?.rarityTypeCount)} rarity types   
                    </Typography>
                    {renderItemsList(gameResults.availableItemsInDeck)}
                </CardContent>
            </Card>
            {/* New Card for Score Statistics */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5">Score Statistics</Typography>
                    <Typography>Average Score: {gameResults.scoreStats.averageScore}</Typography>
                    <Typography>Min Score: {gameResults.scoreStats.minScore}</Typography>
                    <Typography>Max Score: {gameResults.scoreStats.maxScore}</Typography>
                </CardContent>
            </Card>

            {/* New Card for Combo-Stats */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5">Combo Completion Stats</Typography>
                    {renderItemsList(Object.entries(gameResults.comboStats).map(([combo, count]) => ({ [combo]: count })))}
                </CardContent>
            </Card>

            {/* New Card for Unique Wish Ingredients */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5">Unique Wish Ingredients - {gameResults.uniqueWishIngredients?.length}</Typography>
                    {renderWishIngredients(gameResults.uniqueWishIngredients)}
                </CardContent>
            </Card>
            {
                gameResults.playerResults.map((player, index) => (
                    <Card variant="outlined" key={index}>
                        <CardContent>
                            <Typography variant="h6">{player.profile.truckName}</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Score: {player.totalScore}</Typography>
                                    <Typography>Hand Count: {player.handCount}</Typography>
                                    <Typography>Wish Ingredients:</Typography>
                                    {renderWishIngredients(player.profile.wishIngredients ?? '-')}
                                    <Typography>Strategy: {player.profile.strategy.join(', ')}</Typography>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Hand:</Typography>
                                    {renderItemsList(player.hand.map(card => ({ [card]: '' })), true)}
                                    <Typography>Completed Combos:</Typography>
                                    {renderItemsList(player.completedCombos.map(combo => ({ [combo]: '' })), true)}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))
            }
        </div >
    );
};


export const runAnalysis = (playerProfiles) => {
    const deck = createDeck(playerProfiles);
    console.log(deck)
    const gameResult = simulateGame(deck, playerProfiles);
    return gameResult;
};

export const createDeck = (playerProfiles) => {
    let deck = {};
    let totalCardsNeeded = playerProfiles.length * ROUNDS;

    initialIngredients.forEach(ingredient => {
        deck[ingredient.name] = ingredient.copies;
    });

    let totalCardsInDeck = Object.values(deck).reduce((a, b) => a + b, 0);

    while (totalCardsInDeck > totalCardsNeeded) {
        let cardNames = Object.keys(deck).filter(cardName => deck[cardName] > 1);
        if (cardNames.length === 0) break; // Break if all cards are at minimum count
    
        let randomCard = cardNames[Math.floor(Math.random() * cardNames.length)];
        removeCardFromDeck(deck, randomCard);
        totalCardsInDeck--;
    }
    return deck;
};

export const removeCardFromDeck = (deck, cardName) => {
    if (deck[cardName] > 0) {
        deck[cardName]--;
    }
};

export const simulateGame = (deck, playerProfiles) => {
    let playersHands = playerProfiles.map(() => []);
    let roundNumber = 0;
    let gameInProgress = true;

    while (gameInProgress) {
        console.log("--------RoundNumber-------------------", roundNumber);
        playRound(deck, playersHands, playerProfiles, roundNumber);

        // Check if all players have reached the hand size limit or 100 rounds have been played
        gameInProgress = playersHands.some(hand => hand.length < ROUNDS) && roundNumber < 200;
        roundNumber++;
    }

    return generateGameResults(deck, playersHands, playerProfiles);
};

const playRound = (deck, playersHands, playerProfiles, roundNumber, comboData) => {
    playerProfiles.forEach((profile, index) => {
        // Skip picking cards for players who have reached the hand size limit
        if (playersHands[index].length > ROUNDS - 1) {
            return;
        }
        let { cardPicked, missingIngredients, blockedCombos } = pickCard(deck, playersHands[index], profile.strategy, profile.blockedCombos || []);

        if (blockedCombos && blockedCombos.length > 0) {
            profile.blockedCombos = (profile.blockedCombos || []).concat(blockedCombos);
            playersHands[index] = removeBlockedComboCards(playersHands[index], deck);
        }

        if (cardPicked) {
            playersHands[index].push(cardPicked);
            console.log("cardPicked", cardPicked);
            removeCardFromDeck(deck, cardPicked);
        }
        if (missingIngredients && missingIngredients.length > 0) {
            profile.wishIngredients = (profile.wishIngredients || []).concat(missingIngredients);
        }
    });
    // Additional logic for a round
    // For example, check if the game is over or update round-specific data
};



export const pickCard = (deck, hand, strategy, blockedCombos) => {
    let ingredientList = handToIngredientList(hand);
    console.log("ingredientList", ingredientList);

    let [completeCombos] = checkCompleteCombos(ingredientList);
    let blockedCombosList = [];
    console.log("completeCombos", completeCombos);

    let accumulatedMissingIngredients = [];

    for (let comboName of strategy) {
        if (!completeCombos.includes(comboName) && !blockedCombos.includes(comboName)) {
            let result = findBestCardForCombo(deck, comboName, ingredientList);
            if (result) {
                const { bestIngredient, missingIngredients } = result;
                if (bestIngredient) {
                    return { cardPicked: bestIngredient, missingIngredients: accumulatedMissingIngredients, blockedCombos: blockedCombosList };
                }
                if (missingIngredients && missingIngredients.length > 0) {
                    accumulatedMissingIngredients = accumulatedMissingIngredients.concat(missingIngredients);
                }
            } else {
                blockedCombosList.push(comboName);
            }
        }
    }

    // If no card is picked based on the strategy, pick a random card from the deck
    let availableIngredients = Object.keys(deck).filter(key => deck[key] > 0);
    if (availableIngredients.length === 0) {
        console.log("No card is available in the deck.");
        return { cardPicked: null, missingIngredients: accumulatedMissingIngredients, blockedCombos: blockedCombosList };
    }

    let randomCardIndex = Math.floor(Math.random() * availableIngredients.length);
    let randomCard = availableIngredients[randomCardIndex];
    return { cardPicked: randomCard, missingIngredients: accumulatedMissingIngredients, blockedCombos: blockedCombosList };
};


const findBestCardForCombo = (deck, comboName, ingredientList) => {
    // Convert ingredientList to a dictionary for faster lookup
    const ingredientDict = createIngredientDictionary(ingredientList);
    console.log("ingredientDict", ingredientDict)
    // Find the combo object from the trucks.json data
    const combo = trucks.flatMap(truck => truck.combos)
        .find(c => c.ComboName === comboName);
    console.log("combo", combo)
    // If combo not found or no ComboLines, return null
    if (!combo || !combo.ComboLines) {
        return null;
    }

    let allMissingIngredients = [];  // To accumulate missing ingredients

    for (let line of combo.ComboLines) {
        const { shortfall, missingIngredients } = processComboLine(line, ingredientDict);

        if (shortfall > 0) {
            allMissingIngredients = allMissingIngredients.concat(missingIngredients);

            // Find the missing ingredient with the most copies in the deck
            let maxCopies = 0;
            let bestIngredient = null;
            for (let ingredient of missingIngredients) {
                if (deck[ingredient] > maxCopies) {
                    maxCopies = deck[ingredient];
                    bestIngredient = ingredient;
                }
            }

            // If a best ingredient is found, return it immediately
            if (bestIngredient) {
                return { bestIngredient, missingIngredients: allMissingIngredients };
            }
        }
    }

    // If no ingredient is found, return all accumulated missing ingredients
    return { bestIngredient: null, missingIngredients: allMissingIngredients };
};


function combosFromHand(hand) {
    // Convert hand to ingredient list format
    let ingredientList = handToIngredientList(hand);
    // Check which combos are completed
    let [completeCombos, totalScore] = checkCompleteCombos(ingredientList);
    return [completeCombos, totalScore];
}


function handToIngredientList(hand) {
    // Create a new array based on initialIngredients, adjusting the amount based on the player's hand
    const ingredientsState = initialIngredients?.map(ingredient => ({
        ...ingredient,
        amount: hand?.includes(ingredient.name) ? 1 : 0
    }));
    console.log("ingredientsState", ingredientsState)
    return ingredientsState;
}


const removeBlockedComboCards = (hand, deck) => {
    let newHand = [...hand]; // Clone the hand to create a temporary working copy
    let cardsToRemove = [];

    for (let card of hand) {
        // Remove one card temporarily
        let tempHand = newHand.filter(c => c !== card);
        let [completeCombosWithCard] = combosFromHand(newHand);
        let [completeCombosWithoutCard] = combosFromHand(tempHand);

        // If removing the card doesn't reduce the number of completed combos, mark it for removal
        if (completeCombosWithCard.length === completeCombosWithoutCard.length) {
            cardsToRemove.push(card);
        }
    }

    // Remove identified cards from hand and add them back to the deck
    cardsToRemove.forEach(card => {
        let index = newHand.indexOf(card);
        if (index !== -1) {
            newHand.splice(index, 1);
            deck[card] = (deck[card] || 0) + 1; // Add card back to the deck
        }
    });

    return newHand; // Return the updated hand
};