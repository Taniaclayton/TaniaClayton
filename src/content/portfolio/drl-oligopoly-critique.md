---
title: "Critique of DRL in Oligopoly"
category: "GAME THEORY"
description: "A critique of how reinforcement-learning papers claim 'algorithmic collusion' in oligopoly pricing: high prices alone aren't collusion, and very few studies test for the reward–punishment behaviour that is."
tags: ["Game Theory", "Reinforcement Learning", "Industrial Organization", "Working Paper"]
---

*Working paper, March 2026, available on SSRN. Co-authored with Srikanth Pai (Madras School of Economics) and Arunselvan Ramaswamy (IIT Bombay).*

**[Read the paper on SSRN →](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5900103)**

## My role

I found the papers, read and reviewed them, and wrote summaries of each. I then grouped them into categories (tabular Q-learning studies, deep-RL studies, and work on platform design and mitigation). Dr. Pai and Dr. Ramaswamy connected these threads into the paper's overall argument.

## The question

A growing literature uses reinforcement learning (RL) to model how pricing algorithms behave when a few firms compete. Many of these papers report "algorithmic collusion", meaning agents that end up charging prices above the competitive benchmark.

Economics defines collusion more narrowly. Firms have to condition their behaviour on past actions and deter profitable price cuts with credible punishment. High prices alone don't show that. They can also come from instability, exploration effects or quirks of the learning algorithm.

Our paper asks: **when do reported RL results actually meet the repeated-game definition of tacit collusion, and when are they artefacts of the algorithm?**

## Why it matters

Algorithmic pricing is already common in digital markets, and studies of Amazon Marketplace find that many third-party sellers use automated pricing tools. Explicit collusion between firms is illegal (the Sherman Act in the US, the Competition Act in India). Tacit collusion, where firms coordinate purely through repeated actions without communicating, is much harder to detect. If researchers and regulators call any high price "collusion", they risk mislabelling optimisation failures as strategic behaviour.

## The framework

The paper first sets out the background needed to evaluate the evidence:

- **RL to deep RL.** The agent–environment loop, Markov decision processes, the Bellman equation, tabular Q-learning, Deep Q-Networks (DQN), policy-gradient methods (DDPG, PPO) and multi-agent extensions (Markov games, MADDPG).
- **Classical oligopoly models.** Cournot (firms choose quantities), Bertrand (firms choose prices) and the logit demand specification used in most of the RL work. These give the competitive and monopoly benchmarks that learned outcomes are compared against.
- **Repeated games.** The Folk Theorem shows that with patient firms and observable behaviour, many outcomes can be self-enforcing. Theory therefore tells us when tacit collusion *can* be an equilibrium, but not whether learning algorithms will ever find such strategies.

Following Stigler (1964), Harrington (2018) and Calvano et al. (2020), the paper treats collusion as **a reward–punishment scheme**. Prices above the one-shot Nash equilibrium are not enough. A necessary condition is that the strategy is *history-dependent*, so a firm that deviates is punished and deviating costs it more than complying.

## What the literature shows

We reviewed the main RL pricing studies and checked, for each, whether it ran a **forced-deviation experiment** and whether deviations were punished.

| Paper | Model | Algorithm | Forced deviation tested? | Punishment? | Main finding |
|---|---|---|---|---|---|
| Waltman & Kaymak (2008) | Cournot | Tabular Q-learning | No | No | Profits above Nash, no strategic response |
| Calvano et al. (2020) | Bertrand–logit | Tabular Q-learning | Yes | Yes | Clear reward–punishment path |
| Klein (2021) | Bertrand, sequential | Tabular Q-learning | Yes | Yes (coarse price grids only) | Collusion on a coarse grid, cycles otherwise |
| Han (2025) | Bertrand | Weighted Q-learning | No | No | Higher prices, deviation responses not tested |
| Asker et al. (2022) | Bertrand–logit variant, asynchronous | Tabular Q-learning | Yes | Weak | Supracompetitive prices even where collusion is infeasible |
| Epivent & Lambin (2024) | Bertrand–logit | Tabular Q-learning | Yes | Yes, but also for *upward* deviations | Punishes "invitations to collude", which a rational colluder wouldn't |
| Johnson et al. (2023) | Bertrand–logit | Tabular Q-learning | Yes | Indirect | Platform steering collapses supracompetitive outcomes |
| Schlechtinger (2024) | Bertrand | DQN / PPO | No | No | High, oscillating prices even without observing rivals |
| Friedrich et al. (2024) | Bertrand–logit with inventories | DQN / PPO | Yes | Weak | Supracompetitive prices, mild and short-lived reactions to deviations |

A few of the findings that stand out:

- **Tabular Q-learning gives the strongest evidence.** Calvano et al. (2020) show that a forced price cut triggers a short punishment phase and then a return to the high-price path.
- **That evidence is contested.** Asker et al. (2022) find supracompetitive prices even where collusion is infeasible, which suggests some of the price elevation comes from the algorithm's structure. Epivent and Lambin (2024) find that the same agents also punish *upward* deviations, which is not what a rational collusive strategy would do and looks more like learning instability.
- **Deep RL results are weaker.** Hettich (2021) interprets a short-lived price drop after a deviation as punishment but doesn't test whether it is history-dependent, whether the deviation was unprofitable, or whether the reaction persists. Deng et al. (2024) find that DQN, PPO, SAC and related methods usually converge either to competitive prices or to unstable cycles, with no credible deviation–punishment response.
- **Market structure and design matter.** Supracompetitive profits essentially disappear once there are around 10 firms. Johnson et al. (2023) and Brero et al. (2022) show that platform rules, such as steering consumer visibility towards firms that cut prices, can contain collusion among learning agents.

## Our conclusion

RL agents can produce prices above static Nash outcomes in small oligopolies, but these patterns rarely meet the repeated-game criterion for tacit collusion. Only bounded-memory tabular Q-learning with simultaneous moves and explicit forced-deviation tests shows credible reward–punishment responses, and even those are fragile. In most deep-RL studies, elevated prices appear without demonstrable deviation deterrence, and where deviations are induced the responses are weak, symmetric across upward and downward moves, or quickly collapse.

We argue that the literature **substantially over-interprets outcome-level price elevation as collusion**. Claims of autonomous collusion should rest on history-dependent behaviour in which deviating reduces a firm's discounted value relative to complying. Future work should run explicit profitability-based deviation checks rather than relying on price paths alone.
