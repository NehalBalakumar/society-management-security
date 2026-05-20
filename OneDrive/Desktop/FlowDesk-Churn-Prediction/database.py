import pandas as pd
from sqlalchemy import create_engine

# ── Load the generated dataset ─────────────────────────
df = pd.read_csv("flowdesk_customers.csv")

print("=" * 55)
print("   FLOWDESK — DATA CLEANING + SQL DATABASE")
print("=" * 55)

# ══════════════════════════════════════════════════════
# STEP 1 — Check Data Quality
# ══════════════════════════════════════════════════════
print("\n📋 STEP 1 — Data Shape & Types:")
print(f"Rows: {df.shape[0]} | Columns: {df.shape[1]}")
print(df.dtypes)

print("\n❓ Missing Values:")
print(df.isnull().sum())

print("\n📊 Churn Distribution:")
print(df["Churn"].value_counts())

# ══════════════════════════════════════════════════════
# STEP 2 — Clean the Data
# ══════════════════════════════════════════════════════

# Convert Yes/No to 1/0 — ML models need numbers not text
df["Churn_Binary"] = df["Churn"].map({"Yes": 1, "No": 0})

# Convert other Yes/No columns too
df["Has_Mobile_App"] = df["Has_Mobile_App"].map({"Yes": 1, "No": 0})
df["Onboarding_Completed"] = df["Onboarding_Completed"].map({"Yes": 1, "No": 0})

print("\n✅ STEP 2 — Binary columns converted!")
print(df[["Churn", "Churn_Binary",
          "Has_Mobile_App",
          "Onboarding_Completed"]].head())

# ══════════════════════════════════════════════════════
# STEP 3 — Create SQLite Database
# ══════════════════════════════════════════════════════
engine = create_engine("sqlite:///flowdesk_churn.db")
df.to_sql("customers", engine, if_exists="replace", index=False)
print("\n✅ STEP 3 — SQL Database created: flowdesk_churn.db")

# ══════════════════════════════════════════════════════
# STEP 4 — SQL Query 1: Churn Rate by Plan Type
# ══════════════════════════════════════════════════════
query1 = """
SELECT Plan_Type,
       COUNT(*) as Total_Customers,
       SUM(Churn_Binary) as Churned,
       ROUND(AVG(Churn_Binary) * 100, 2) as Churn_Rate_Pct
FROM customers
GROUP BY Plan_Type
ORDER BY Churn_Rate_Pct DESC
"""
print("\n📊 STEP 4 — Churn Rate by Plan Type:")
print(pd.read_sql(query1, engine).to_string())

# ══════════════════════════════════════════════════════
# STEP 5 — SQL Query 2: Churn Rate by Contract Length
# ══════════════════════════════════════════════════════
query2 = """
SELECT Contract_Length,
       COUNT(*) as Total_Customers,
       SUM(Churn_Binary) as Churned,
       ROUND(AVG(Churn_Binary) * 100, 2) as Churn_Rate_Pct,
       ROUND(AVG(Monthly_Charges_INR), 0) as Avg_Monthly_Charge
FROM customers
GROUP BY Contract_Length
ORDER BY Churn_Rate_Pct DESC
"""
print("\n📊 STEP 5 — Churn Rate by Contract Length:")
print(pd.read_sql(query2, engine).to_string())

# ══════════════════════════════════════════════════════
# STEP 6 — SQL Query 3: High Risk Customers
# Customers most likely to churn
# ══════════════════════════════════════════════════════
query3 = """
SELECT Customer_ID, Plan_Type, Contract_Length,
       Tenure_Months, Monthly_Charges_INR,
       Login_Frequency, Feature_Usage_Score,
       Support_Tickets, Churn
FROM customers
WHERE Contract_Length = 'Monthly'
  AND Login_Frequency < 5
  AND Feature_Usage_Score < 30
  AND Churn = 'Yes'
ORDER BY Support_Tickets DESC
LIMIT 10
"""
print("\n📊 STEP 6 — Top 10 High Risk Churned Customers:")
print(pd.read_sql(query3, engine).to_string())

# ══════════════════════════════════════════════════════
# STEP 7 — SQL Query 4: Revenue Lost to Churn
# ══════════════════════════════════════════════════════
query4 = """
SELECT Plan_Type,
       SUM(Monthly_Charges_INR) as Revenue_Lost_INR,
       COUNT(*) as Customers_Lost
FROM customers
WHERE Churn = 'Yes'
GROUP BY Plan_Type
ORDER BY Revenue_Lost_INR DESC
"""
print("\n📊 STEP 7 — Monthly Revenue Lost to Churn by Plan:")
result = pd.read_sql(query4, engine)
result["Revenue_Lost_INR"] = result["Revenue_Lost_INR"].apply(
    lambda x: f"₹{x:,.0f}"
)
print(result.to_string())

# ══════════════════════════════════════════════════════
# STEP 8 — Save Clean CSV for ML
# ══════════════════════════════════════════════════════
df.to_csv("flowdesk_clean.csv", index=False)
print("\n✅ STEP 8 — Clean CSV saved: flowdesk_clean.csv")
print("🎉 Database setup complete!")