"use client";

import { useState } from "react";
import FilterBar, { FilterValues } from "../components/filter";
import Table, { FileRow } from "../components/Table";

const rows: FileRow[] = [
  {
    id: "1",
    filename:
      "Comprehensive Introduction to Personal Finance and Basic Budgeting Strategies for Beginners.pdf",
    tags: ["pdf", "finance"],
    href: "/files/lecture1.pdf",
  },
  {
    id: "2",
    filename:
      "Understanding Investment Vehicles Stocks Bonds Mutual Funds and ETFs Explained in Simple Terms Slides.zip",
    tags: ["slides", "investment"],
    href: "/files/slides.zip",
  },
  {
    id: "3",
    filename:
      "How to Read Financial Statements A Practical Guide for Students and Young Professionals.pdf",
    tags: ["pdf", "accounting"],
    href: "/files/lecture3.pdf",
  },
  {
    id: "4",
    filename:
      "Risk Management Basics Identifying Assessing and Mitigating Financial Risks in Portfolios.pdf",
    tags: ["pdf", "risk"],
    href: "/files/lecture4.pdf",
  },
  {
    id: "5",
    filename:
      "Practical Guide to Creating an Emergency Fund and Short Term Savings Plan for Households.pdf",
    tags: ["pdf", "savings"],
    href: "/files/lecture5.pdf",
  },
  {
    id: "6",
    filename:
      "Budgeting Techniques Zero Based Budgeting Envelope Method and Percentage Allocations Explained.pdf",
    tags: ["pdf", "budget"],
    href: "/files/lecture6.pdf",
  },
  {
    id: "7",
    filename:
      "Long Term Investment Planning Retirement Goals and Compound Interest Examples for College Students.pdf",
    tags: ["pdf", "retirement"],
    href: "/files/lecture7.pdf",
  },
  {
    id: "8",
    filename:
      "Intro to Financial Markets How Exchanges Brokers and Trading Work for New Investors Slides.zip",
    tags: ["slides", "markets"],
    href: "/files/lecture8.zip",
  },
  {
    id: "9",
    filename:
      "Taxes 101 Understanding Income Tax Filing Deductions Credits and Important Deadlines for Beginners.pdf",
    tags: ["pdf", "tax"],
    href: "/files/lecture9.pdf",
  },
  {
    id: "10",
    filename:
      "Basic Principles of Portfolio Diversification Allocation Across Asset Classes and Rebalancing Techniques.pdf",
    tags: ["pdf", "portfolio"],
    href: "/files/lecture10.pdf",
  },
  {
    id: "11",
    filename:
      "Evaluating Investment Performance Simple Metrics Return Volatility Sharpe Ratio and Benchmarks Explained.pdf",
    tags: ["pdf", "metrics"],
    href: "/files/lecture11.pdf",
  },
  {
    id: "12",
    filename:
      "How to Start Investing with Small Amounts Dollar Cost Averaging and Low Cost Index Funds for Beginners.zip",
    tags: ["slides", "investing"],
    href: "/files/lecture12.zip",
  },
  {
    id: "13",
    filename:
      "Personal Credit and Loans Managing Credit Cards Interest Rates and How to Build Good Credit History.pdf",
    tags: ["pdf", "credit"],
    href: "/files/lecture13.pdf",
  },
  {
    id: "14",
    filename:
      "Fundamental Analysis vs Technical Analysis Basic Tools and Ratios for Stock Selection.pdf",
    tags: ["pdf", "analysis"],
    href: "/files/lecture14.pdf",
  },
  {
    id: "15",
    filename:
      "Financial Planning for Students Balancing Education Expenses Part time Work and Savings Goals Slides.zip",
    tags: ["slides", "planning"],
    href: "/files/lecture15.zip",
  },
  {
    id: "16",
    filename:
      "Understanding Bonds Types Coupons Yield to Maturity and Price Relationships Explained.pdf",
    tags: ["pdf", "bonds"],
    href: "/files/lecture16.pdf",
  },
  {
    id: "17",
    filename:
      "Real Estate Basics Buying Renting Mortgages and Cash Flow Considerations for Young Investors.pdf",
    tags: ["pdf", "realestate"],
    href: "/files/lecture17.pdf",
  },
  {
    id: "18",
    filename:
      "Behavioral Finance Why Investors Make Irrational Decisions and How to Avoid Common Biases.pdf",
    tags: ["pdf", "behavioral"],
    href: "/files/lecture18.pdf",
  },
  {
    id: "19",
    filename:
      "Introduction to Mutual Funds Types Fees and How to Choose the Right Fund for Your Goals.pdf",
    tags: ["pdf", "funds"],
    href: "/files/lecture19.pdf",
  },
  {
    id: "20",
    filename:
      "Saving for Major Life Events Weddings Education and Home Purchase a Practical Approach Slides.zip",
    tags: ["slides", "savings"],
    href: "/files/lecture20.zip",
  },
  {
    id: "21",
    filename:
      "Expense Tracking Tools Mobile Apps and Simple Spreadsheets to Monitor Cash Flow and Spending Habits.pdf",
    tags: ["pdf", "tools"],
    href: "/files/lecture21.pdf",
  },
  {
    id: "22",
    filename:
      "Insurance Essentials Health Life Property and Liability Insurance Coverage Explained for Beginners.pdf",
    tags: ["pdf", "insurance"],
    href: "/files/lecture22.pdf",
  },
  {
    id: "23",
    filename:
      "How to Read a Balance Sheet Step by Step with Real Company Examples and Practical Exercises.pdf",
    tags: ["pdf", "accounting"],
    href: "/files/lecture23.pdf",
  },
  {
    id: "24",
    filename:
      "Investment Strategies for Conservative Moderate and Aggressive Investors Allocation Examples and Case Studies.zip",
    tags: ["slides", "strategy"],
    href: "/files/lecture24.zip",
  },
  {
    id: "25",
    filename:
      "Understanding Mutual Fund Prospectus Fees Risks and How to Compare Different Funds.pdf",
    tags: ["pdf", "funds"],
    href: "/files/lecture25.pdf",
  },
  {
    id: "26",
    filename:
      "Debt Repayment Methods Snowball vs Avalanche Choosing a Plan and Staying Motivated.pdf",
    tags: ["pdf", "debt"],
    href: "/files/lecture26.pdf",
  },
  {
    id: "27",
    filename:
      "How to Build an Emergency Budget and Reduce Non Essential Spending Without Sacrificing Goals Slides.zip",
    tags: ["slides", "budget"],
    href: "/files/lecture27.zip",
  },
  {
    id: "28",
    filename:
      "Small Business Finance Basics Cash Flow Statements Profit Margins and Funding Options for Startups.pdf",
    tags: ["pdf", "business"],
    href: "/files/lecture28.pdf",
  },
  {
    id: "29",
    filename:
      "Understanding Exchange Traded Funds ETFs Benefits Risks and How They Differ from Mutual Funds.pdf",
    tags: ["pdf", "etf"],
    href: "/files/lecture29.pdf",
  },
  {
    id: "30",
    filename:
      "Building Wealth Over Time Compound Interest Long Term Investing and Setting Realistic Expectations.pdf",
    tags: ["pdf", "wealth"],
    href: "/files/lecture30.pdf",
  },
  {
    id: "31",
    filename:
      "Practical Guide to Tax Efficient Investing Using Retirement Accounts and Tax Aware Strategies Slides.zip",
    tags: ["slides", "tax"],
    href: "/files/lecture31.zip",
  },
  {
    id: "32",
    filename:
      "How to Evaluate a Company Using Revenue Profit Margins Growth and Competitive Advantages.pdf",
    tags: ["pdf", "valuation"],
    href: "/files/lecture32.pdf",
  },
  {
    id: "33",
    filename:
      "Money Management Skills for New Graduates Managing Salary Bonuses and Early Investments.pdf",
    tags: ["pdf", "career"],
    href: "/files/lecture33.pdf",
  },
  {
    id: "34",
    filename:
      "Understanding Financial Ratios Liquidity Solvency and Profitability Explained with Examples.pdf",
    tags: ["pdf", "ratios"],
    href: "/files/lecture34.pdf",
  },
  {
    id: "35",
    filename:
      "How to Use an Investment Brokerage Account Placing Orders Types of Orders and Fees to Watch.pdf",
    tags: ["pdf", "brokerage"],
    href: "/files/lecture35.pdf",
  },
  {
    id: "36",
    filename:
      "Beginner Friendly Guide to Index Funds Why They Work and How to Pick One for Your Portfolio.pdf",
    tags: ["pdf", "indexfunds"],
    href: "/files/lecture36.pdf",
  },
  {
    id: "37",
    filename:
      "Understanding Inflation Its Causes Effects on Purchasing Power and Ways to Protect Your Savings.zip",
    tags: ["slides", "inflation"],
    href: "/files/lecture37.zip",
  },
  {
    id: "38",
    filename:
      "Estate Planning Basics Wills Trusts and Preparing Financial Affairs for the Future.pdf",
    tags: ["pdf", "estate"],
    href: "/files/lecture38.pdf",
  },
  {
    id: "39",
    filename:
      "How to Read an Income Statement Revenue Costs Expenses and Profitability Step by Step.pdf",
    tags: ["pdf", "accounting"],
    href: "/files/lecture39.pdf",
  },
  {
    id: "40",
    filename:
      "Practical Steps to Create a Personal Financial Roadmap Goal Setting and Actionable Milestones Slides.zip",
    tags: ["slides", "planning"],
    href: "/files/lecture40.zip",
  },
  {
    id: "41",
    filename:
      "Understanding Interest Rates How They Are Determined and the Impact on Loans Savings and Investments.pdf",
    tags: ["pdf", "interest"],
    href: "/files/lecture41.pdf",
  },
  {
    id: "42",
    filename:
      "Guide to Building a Simple Investment Plan Step by Step for First Time Investors with Examples.pdf",
    tags: ["pdf", "guide"],
    href: "/files/lecture42.pdf",
  },
  {
    id: "43",
    filename:
      "Managing Personal Finances While Studying Tips for Saving Time Money and Energy Alongside Academics.pdf",
    tags: ["pdf", "student"],
    href: "/files/lecture43.pdf",
  },
  {
    id: "44",
    filename:
      "Practical Examples of Stock Analysis Featuring Real Company Case Studies and Outcomes.zip",
    tags: ["slides", "analysis"],
    href: "/files/lecture44.zip",
  },
  {
    id: "45",
    filename:
      "How to Create a Monthly Savings Habit Automating Transfers and Tracking Progress Over Time.pdf",
    tags: ["pdf", "savings"],
    href: "/files/lecture45.pdf",
  },
  {
    id: "46",
    filename:
      "Introduction to Cryptocurrency Concepts Blockchain Wallets and Basic Security Practices for Newcomers.pdf",
    tags: ["pdf", "crypto"],
    href: "/files/lecture46.pdf",
  },
  {
    id: "47",
    filename:
      "Calculating Returns Understanding CAGR Time Weighted Returns and Practical Examples.zip",
    tags: ["slides", "returns"],
    href: "/files/lecture47.zip",
  },
  {
    id: "48",
    filename:
      "Negotiation Techniques for Better Financial Outcomes Salary and Contract Negotiations Tips and Scripts.pdf",
    tags: ["pdf", "negotiation"],
    href: "/files/lecture48.pdf",
  },
  {
    id: "49",
    filename:
      "Understanding Financial Statements for Small Business Owners Practical Overview and Templates.pdf",
    tags: ["pdf", "smallbiz"],
    href: "/files/lecture49.pdf",
  },
  {
    id: "50",
    filename:
      "Final Summary Key Takeaways and Next Steps for Continuing Financial Education Slides.zip",
    tags: ["slides", "summary"],
    href: "/files/lecture50.zip",
  },
];

export default function MateriPage() {
  const [allRows] = useState<FileRow[]>(() =>
    rows.map((r, i) => ({
      ...r,
      createdAt:
        (r as any).createdAt ||
        `2025-01-${String((i % 28) + 1).padStart(2, "0")}`,
    }))
  );

  const [filteredRows, setFilteredRows] = useState<FileRow[]>(allRows);

  const handleApply = (filters: FilterValues) => {
    let res = allRows.slice();
    // search
    if (filters.search && filters.search.trim()) {
      const s = filters.search.trim().toLowerCase();
      res = res.filter((r) => r.filename.toLowerCase().includes(s));
    }
    // tags: require that all provided tags exist on the row
    if (filters.tags && filters.tags.length > 0) {
      res = res.filter((r) =>
        (filters.tags || []).every((t) => r.tags?.includes(t))
      );
    }
    // date range
    if (filters.dateFrom) {
      res = res.filter((r) => (r.createdAt || "") >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      res = res.filter((r) => (r.createdAt || "") <= filters.dateTo!);
    }

    setFilteredRows(res);
  };

  return (
    <div style={{ minHeight: "60vh", padding: "2rem" }}>
      <div style={{ maxWidth: "90vw", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
          Materi
        </h1>
        <p style={{ color: "#374151", marginBottom: "1rem" }}>
          Materi berkaitan dengan edukasi keuangan, investasi, dan pengelolaan
          dana anggota KSPM PKN STAN. Silakan pilih materi yang ingin Anda
          pelajari dari daftar di bawah ini.
        </p>
        <div style={{ marginBottom: "2rem" }}>
          <FilterBar onApply={handleApply} />
        </div>
        <Table rows={filteredRows} />
      </div>
    </div>
  );
}
