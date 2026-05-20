import pandas as pd

# ── Load Dataset ───────────────────────────────────────
df = pd.read_csv("flowdesk_customers.csv")

print("=" * 50)
print("   FLOWDESK CHURN DATASET — EXPLORATION")
print("=" * 50)

# Basic info
print(f"\n📊 Shape: {df.shape}")
print(f"\n📋 Columns:\n{df.columns.tolist()}")
print(f"\n🔍 First 5 rows:\n{df.head()}")
print(f"\n❓ Missing Values:\n{df.isnull().sum()}")
print(f"\n📈 Data Types:\n{df.dtypes}")

# Churn distribution
print("\n\n🎯 CHURN DISTRIBUTION:")
print(df["Churn"].value_counts())
print(f"Churn Rate: {df['Churn'].value_counts(normalize=True)['Yes']*100:.1f}%")

# Churn by Plan Type
print("\n📊 CHURN RATE BY PLAN TYPE:")
print(df.groupby("Plan_Type")["Churn"].apply(
    lambda x: f"{(x=='Yes').sum()} churned out of {len(x)} ({(x=='Yes').mean()*100:.1f}%)"
))

# Churn by Contract Length
print("\n📊 CHURN RATE BY CONTRACT LENGTH:")
print(df.groupby("Contract_Length")["Churn"].apply(
    lambda x: f"{(x=='Yes').sum()} churned out of {len(x)} ({(x=='Yes').mean()*100:.1f}%)"
))

# Average metrics for churned vs retained
print("\n📊 CHURNED vs RETAINED — Average Metrics:")
print(df.groupby("Churn")[["Tenure_Months",
                             "Monthly_Charges_INR",
                             "Login_Frequency",
                             "Feature_Usage_Score",
                             "Support_Tickets"]].mean().round(2))