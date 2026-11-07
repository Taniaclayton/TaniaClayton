---
title: "Stoch Project"
category: "STOCHASTIC PROCESSES"
description: "The problem of n liars: how a 1930s puzzle about unreliable witnesses turns into a two-state Markov chain, extended to asymmetric lying and N-state chains, and checked by simulation."
tags: ["Markov Chains", "Probability", "Bayes' Theorem", "Simulation"]
---

*Stochastic Processes project, 2025, Madras School of Economics. Co-authored with Anjali Sreekumar.*

## The puzzle

Four people, A, B, C and D, each tell the truth only one time in three. A says that B denies that C declares D to be a liar. What is the probability that D was telling the truth?

Eddington (1935) posed this problem, and it has been argued over ever since because the statements can be read in more than one way. Two approaches come up. Multiplying independent probabilities along the chain of statements ignores that some chains of lies and truths are inconsistent with each other. The exclusion method throws out the impossible histories and counts only those consistent with every statement, which gives **25/71** for D telling the truth.

Deakin (2009) revisited the problem with a rigorous probabilistic treatment. His key insight is that a nested statement like this can be simplified by counting whether the chain contains an **even or odd number of lies**. Feller (1951) turned that idea into the "n liars" problem and showed it is a Markov chain in disguise. Our project works through that connection step by step.

## From liars to a Markov chain

If B denies that C says D lied, B is implying D told the truth. If A then denies B's statement, D is lying after all. Each denial flips the meaning, so what matters is how many flips there are.

To make this a Markov chain, we assume each person knows only the last speaker's statement. The state at each step is either **1 (truth)** or **2 (lie)**, with a starting probability α of truth and β = 1 − α of a lie. Each speaker repeats the previous statement faithfully with probability *p* and flips it with probability *q* = 1 − *p*:

```
P = | p  q |
    | q  p |
```

What we want is the **posterior**: given the statement we observe after *n* steps, how likely is it that the original statement was the truth?

## What we derived

- **n-step transitions.** Using the law of total probability and the Chapman–Kolmogorov equation, the probability of going from state *j* to state *k* in *n* steps satisfies a simple recursion.
- **A closed form without linear algebra.** The paper we followed uses a canonical (eigenvalue) decomposition. We wanted to understand it without that machinery, so we tracked the sum and difference of the two state probabilities. The sum stays at 1 because probabilities add to 1, and the difference shrinks as (*p* − *q*)<sup>*n*</sup>. That gives
  `uₙ = (1 + (p − q)ⁿ) / 2`, so the influence of the starting state fades geometrically.
- **The posterior.** By Bayes' theorem, the probability that the chain started in state 1 given that it ends in state 1 is
  `xₙ = α[1 + (p − q)ⁿ] / [1 + (α − β)(p − q)ⁿ]`.
- **Long-run behaviour.** The chain is irreducible and aperiodic, so it has a unique stationary distribution and forgets where it started. With symmetric flipping, that distribution is (½, ½). In general, with transition matrix [[p, 1−p], [q, 1−q]], it is π₁ = q / (1 − p + q).

## Preferential lying

So far everyone had the same chance of telling the truth. We then let it depend on the current state: someone who has just told the truth may be more (or less) likely to keep doing so than someone who has just lied. Using separate transition probabilities (*p*, *q*) from state 1 and (*q′*, *p′*) from state 2, the n-step matrix splits into two parts. The first is a long-run equilibrium that depends on the biases, and the second fades at rate (*p′* − *q*)<sup>*n*</sup>.

## Generalising to N states

Nothing in the argument depends on there being only two states. For an N-state chain with transition matrix **P** and initial probabilities α, the probability that the chain started in state *i* given that it is in state *k* after *n* steps is

`P(start = i | at n = k) = αᵢ (Pⁿ)ᵢₖ / Σⱼ αⱼ (Pⁿ)ⱼₖ`

This covers situations like digits or symbols that get copied and sometimes change, not just truth and lies.

## Checking it by simulation

We ran Monte Carlo simulations for two-state and multi-state chains, with both symmetric and asymmetric transition matrices, and compared them with the formulas:

- **Two-state chain.** The probability of being in the starting state decays towards ½ and then flattens, as the formula predicts.
- **N-state chain.** With a uniform error model (equal probability of moving to any state), the distribution after 75 steps sits on the uniform stationary distribution 1/N, with only a tiny residual from the finite number of steps.
- **Analytical vs numerical.** The stationary distribution we derived matched the numerically iterated one in every state.
- **Total variation distance.** On a log scale, the distance to the stationary distribution falls as a straight line, which is exponential decay and what ergodicity predicts.

The simulation code was written with AI assistance, as we state in the paper.

## What I took from it

A puzzle that looks like a logic riddle is a Markov chain once you ask what each speaker actually knows. Once you do, everything else follows: the posterior comes from Bayes, the long-run behaviour from ergodicity, and the generalisation to N states is a matter of matrix notation.

## References

Feller (1951), *The Problem of n Liars and Markov Chains*, American Mathematical Monthly. Eddington (1935), *The Problem of A, B, C and D*, The Mathematical Gazette. Deakin (2009), *A New Look at Eddington's Liar Problem*, The Mathematical Gazette.
