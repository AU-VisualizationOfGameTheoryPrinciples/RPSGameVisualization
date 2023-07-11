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