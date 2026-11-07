---
title: "Event Study in Nifty 100 Markets"
category: "EVENT STUDY"
description: "Do Nifty 100 stocks react 'properly' to dividend announcements? An event study of 709 dividend declarations (2020–2025) testing the semi-strong form of the Efficient Market Hypothesis."
tags: ["Event Study", "Market Efficiency", "Stata", "Python"]
---

*Co-authored with Faheema Sulaiman. Applied Econometrics term paper, March 2026.*

## How this project happened

This started as a reading project with **Dr. Srikanth Pai**. I read the original event study papers (Fama, Fisher, Jensen & Roll; MacKinlay; Brown & Warner; Boehmer, Musumeci & Poulsen) and presented them in the **MSE research seminar**. Afterwards I tried replicating the method on Nifty 100 data, then set it aside for a while. I picked it back up for my Applied Econometrics term paper, and this page is the result.

## The question

When a Nifty 100 company announces a dividend, does the market react properly?

The semi-strong form of the Efficient Market Hypothesis (Fama, 1970) says prices should absorb public information immediately and completely. If so, a dividend announcement should move the price on Day 0, with no systematic abnormal returns before it or after it.

India is a useful place to test this. It is one of the fastest-growing markets in the world, with a large and increasingly retail-heavy investor base, and it is much less studied than the US or UK.

## Data

- **Source:** CMIE Prowess. Daily adjusted closing prices, shares outstanding and market capitalisation for Nifty 100 constituents, April 2018 to March 2025.
- **Market proxy:** the Nifty 100 index itself.
- **Sample:** 96 firms had usable price histories. 90 of them matched the dividend database, giving 712 raw dividend events and **709 usable events** after dropping three with too little price history.
- **Event date:** the board-meeting announcement date, not the ex-dividend date, because the ex-date is a settlement convention and carries no new information.
- **Cleaning:** wide-to-long reshaping in Python, daily log returns, and removal of single-day moves above 50% as likely data errors. Estimation and testing were done in Stata.

## Method

1. **Normal returns.** A market model, R<sub>it</sub> = α<sub>i</sub> + β<sub>i</sub>R<sub>mt</sub> + ε<sub>it</sub>, estimated by OLS separately for each stock-event pair over a 250-trading-day estimation window, with a gap before the event window so the benchmark isn't contaminated.
2. **Event window.** 15 trading days before to 20 days after the announcement, [−15, +20].
3. **Abnormal returns.** AR = actual return minus the market-model prediction, then standardised by each stock's estimation-window residual standard deviation. Cumulated into CARs per event and averaged into **CAARs** across events.
4. **Tests.**
   - A standard *t*-test and a Wilcoxon signed-rank test, which doesn't assume normal returns.
   - The **BMP test** (Boehmer et al., 1991), which standardises abnormal returns so that event-induced volatility doesn't inflate significance.
   - Sub-window tests on [−15, −1], Day 0 and [+1, +20], to pin down *when* abnormal returns show up.
   - A regression of CAAR on event day before and after the announcement, to test for a systematic trend.

## What I found

### Prices move before the announcement

Across all 709 events, CAAR starts rising around Day −10 and peaks just after the announcement, then falls back through Day +20.

<!-- FIGURE 1: drop the CAAR chart from the paper (page 9) at public/images/event-study/caar.png, then uncomment:
![CAAR around dividend announcements, Nifty 100, 2020–2025, N = 709 events, with 95% confidence band](/TaniaClayton/images/event-study/caar.png)
-->

The BMP test is significant on every day from −12 to +20 (at the 1% level from −11 onward) and peaks at *t* = 18.3 on Day +3, not on the announcement day.

![Mean cumulative standardised abnormal return by event day, with significance markers from the BMP test](/TaniaClayton/images/event-study/bmp-csar.png)

*Mean cumulative standardised abnormal return by event day (N = 709). Redrawn from the BMP results in the paper's Appendix Table 3.*

### The announcement day itself is quiet

| | Pre [−15, −1] | Day 0 | Post [+1, +20] |
|---|---|---|---|
| Mean CAR | +0.91% | +0.05% | −0.45% |
| *t*-statistic | 3.64 | 0.60 | −1.27 |
| Wilcoxon *z* | 3.72 | 0.46 | −2.29 |
| Wilcoxon *p* | < 0.001 | 0.644 | 0.022 |

The pre-announcement run-up is significant under both tests. Day 0 is indistinguishable from zero. After the announcement there is a mild reversal, significant under the Wilcoxon test but not the parametric *t*-test.

### A steady climb, then a gradual correction

Regressing daily CAAR on event day:

| | Pre [−15, −1] | Post [+1, +20] |
|---|---|---|
| Slope per day | +0.0006 *** | −0.0003 *** |
| R² | 0.848 | 0.356 |

CAAR rises about 0.06 percentage points a day for the 15 days before the announcement and falls about 0.03 points a day for the 20 days after.

### The full-window average is not significant

Over the whole [−15, +20] window the mean CAR is 0.51% (*t* = 1.108, *p* = 0.268; Wilcoxon *p* = 0.508). Individual events drift in different directions and the average washes out, so the BMP result says the *pattern* is non-random while the full-window test says the *net level* is not reliably positive.

## What it means

The pattern is a pre-announcement rise, no reaction on the day, and a mild reversal afterwards. That is hard to square with semi-strong efficiency, and it fits informed trading ahead of public disclosure (Kyle, 1985) followed by partial correction.

## Limitations

- **Market model stability.** The market model assumes a stable stock–market relationship, which may break down in volatile periods such as COVID-19.
- **Survivorship bias.** Using firms with continuous listing histories may overstate abnormal returns.
- **Index as both universe and benchmark.** Using the Nifty 100 as both the sample universe and the market proxy biases beta estimates mechanically.
- **Ex-dividend overlap.** In 396 of the 709 events the ex-dividend date falls inside the event window, which can confound abnormal returns around that date.

## What's next

My Applied Econometrics professor's main comment was that I could go beyond cross-sectional tests and also use **time-series tests**. The current approach averages across events at each event day. A natural extension is to treat the abnormal-return series as a time series in its own right, for example by testing for autocorrelation and persistence rather than only testing cross-sectional means. This is the direction I want to take the project next.

## Reading list

Fama (1970); Fama, Fisher, Jensen & Roll (1969); MacKinlay (1997); Brown & Warner (1985); Boehmer, Musumeci & Poulsen (1991); Bhattacharya (1979); Kyle (1985); Michaely, Thaler & Womack (1995).
