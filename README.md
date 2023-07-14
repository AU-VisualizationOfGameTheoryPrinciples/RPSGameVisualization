# RPSGameVisualization

This is a Visualization of the Rock, Paper, Scissors Game showing its connections to Game Theory.

## Learning Objectives of the Rock, Paper, Scissors Game
- explain the concept of [zero-sum games](https://en.wikipedia.org/wiki/Zero-sum_game)
- explain the concept of [mixed-strategy equilibria](https://en.wikipedia.org/wiki/Strategy_(game_theory)#Mixed_strategy)
- use mixed strategies
## Introduction
- You can play Rock, Paper, Scissors against a Computer player (CPU).
- By default the CPU chooses their move randomally in a equal manner, so one of the three options is choosed one third of the time.
- But by pressing the **Settings button** ⚙ in the top bar, there are some settings to change up the game.
- The area with the checkboxes determines the behavior of the CPU agent. So for each checked strategy, the CPU chooses randomally one of his strategies (based on a uniform distribution probability). 
    - By default the CPU chooses each round one of his strategies, but if **Opponent uses only one of the checked Strategies** is checked, it chooses one of his strategies for the hole game. 
- With the **Utility table** below you can change the utility values for the tuple of options used, so [Rock,Paper] could result in a different score as [-1,1] respectively for each player. 
    - The rows show the options for player 1 (real person) and the columns show the options for player 2 (CPU).

## Strategies
- The strategies for the CPU are the following: 
    - **Opponent uses random move:** CPU chooses each move one third of the time.
    - **Opponent uses his Mixed Strategy Nash Equilibria:** CPU chooses each move based on the given utility for the RPS tuples used (without changing the utilities it results to the same as the previous strategy).
    - **Opponent uses his moves in a certain habit:** CPU uses the same move of the last round if it won, if it lost it uses the counter move to the move it was using. After a tie it chooses a random move.
    - **Opponent tries to counter common habit moves:** CPU tries to counter the previous strategy. If the real player has the habit of the previous strategy, the CPU will be winning all the time (except after ties).

## MSNE

The Expected Utilities (using the move Left (Rock), Center (Paper) or Right (Scissors) - as seen in the utility table) for player 2 (CPU) can be put together to an linear equation system and with that you can calculate the probabilities for the **Mixed Strategy Nash equilibria**. By restructuring the equations with some substitutions let them be calculated in base Javascript:

$$EUL = EUC = EUR$$
$$EUL = dU a2 + dM d2 + (1-dU-dM) g2$$
$$EUC = dU b2 + dM e2 + (1-dU-dM) h2$$
$$EUR = dU c2 + dM f2 + (1-dU-dM) i2$$

$\implies$

$$x = {(-d2+e2+g2-h2) \over (a2-b2-g2+h2)}$$
$$y = {(h2-g2) \over (a2-b2-g2+h2)}$$
$$p = -b2 + h2 + c2 - i2$$
$$q = -h2 + i2$$
Restructure to get sigma probability variables
$$dM = ((y) p + q) / ((-x) p + q + e2 - f2)$$
$$dU = dM (x) + (y)$$
$$dD = 1 - dM - dU$$

- see the [Game Theory 101](https://www.youtube.com/watch?v=C6_72XPpKNQ&list=PLKI1h_nAkaQoDzI4xDIXzx6U2ergFmedo&index=38) video series for more information, which was used as a basis
