---
title: "Milo Finance Dashboard"
category: "FINTECH"
description: "MILO, an AI-powered market analytics dashboard that turns raw NSE and NASDAQ end-of-day data, social sentiment and market-regime context into one workflow: find setups, size them, plan the trade, review how it went."
tags: ["Flask", "MySQL", "AWS Lightsail", "Python", "Analytics"]
---

**MILO: An AI-Powered Market Analytics Dashboard**

*Flask · MySQL · AWS Lightsail · Python · vanilla HTML/CSS/JS*

I built MILO during my internship at a trading and insurance startup. It takes raw end-of-day data for NSE and NASDAQ stocks, adds social sentiment and market-regime context, and turns them into one workflow: find setups, size them, plan the trade, and review how it went.

## Finding setups: Banker RSI signals

The core signal is a Banker RSI, a smoothed RSI variant that flags stocks whose momentum turns after a quiet stretch.

![MILO's NASDAQ Banker Signals page, listing tickers with signal type, Banker RSI, volume change and closing price](/TaniaClayton/images/milo/banker-signals.png)

The signals page has an NSE/NASDAQ toggle and sorts every ticker into 5-day, 3-day or immediate setups, with volume change, sector and a "prior 5 days" strip so you can see the pattern behind each signal. On the day of this screenshot, 81 NASDAQ tickers qualified as 5-day setups out of 1,810 above zero. The page exists to cut that list down.

Getting the signal right took real debugging. I traced errors in how the Wilder Smoothing was seeded, because a small initialization choice quietly changes every number downstream.

## Reading the crowd: Twitter Visibility

I wanted to know which stocks a set of followed accounts were talking about. This view pulls the most-mentioned tickers into a word cloud sized by mention count. Colour shows what's new, with tickers that entered today in red and previously seen ones in blue. Underneath is a 14-day sentiment trend for any ticker, plus the top keywords driving the chatter.

![MILO's Twitter Visibility page, a word cloud of the most-mentioned tickers, coloured by whether they are new today](/TaniaClayton/images/milo/twitter-visibility.png)

## From signal to suggestion: Trading Suggestions

This page turns signals into ranked swing-trade ideas. Each one has entry, target and stop levels, a risk-reward ratio, a backtested win probability with its sample size, and a composite score. Position size is computed from the portfolio value you enter.

A market-regime banner shows VIX, oil and the 10-year yield rolled into a macro score and a risk-on/risk-off flag. A hard 7% monthly-loss governor tracks drawdown and halts new entries once the limit is hit. I added the governor because I'd read enough behavioral economics to know the biggest risk in trading is usually the trader.

## Planning and discipline: Trade Table and Execution Table

The Trade Table is where a setup becomes a plan: entry, target, dates, position, and a per-trade criteria checklist, plus weekly targets and an exposure warning when too many positions are open.

The Execution Table is the review side. It tracks outcomes against the plan and records whether each trade followed it, so I can separate good process from good luck.

![MILO's Execution Table, with summary statistics for win rate and plan adherence above a table of closed trades](/TaniaClayton/images/milo/execution-table.png)

## Watch list and alert list

**Watch list.** You add a ticker and choose NSE or NASDAQ, and it becomes a reference list showing each stock's price, Banker RSI and volume. You can also import a batch of tickers from a CSV instead of adding them one by one.

**Alert list.** You add a ticker, pick NSE or NASDAQ, then set a target price and a tolerance level. When the price reaches the target, the site sends a notification and the alert blinks.

## What I learned

- **Real data is messy.** Most of my time went on pipeline bugs, chunked loads and frontend rendering, not the "interesting" modelling.
- **Not everything needs AI.** RSI is deterministic math, so an LLM in the loop adds latency and a failure point. If AI belongs anywhere, it's at the last step, interpreting finished signals.
- **A good signal isn't a good trade.** The plan-followed tracking and the loss governor came from this: what I'm really designing for is decisions.

*MILO is a personal analytics project shown for demonstration. Nothing here is investment advice.*
