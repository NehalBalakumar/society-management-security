import pandas as pd
import numpy as np
import random

# ── Seed for reproducibility ───────────────────────────
np.random.seed(42)
random.seed(42)
n = 7000  # 7000 SaaS customers

# ── Indian SaaS Startup Names (for context) ────────────
companies = [
    "Razorpay", "CRED", "Zepto", "Meesho", "Groww",
    "PhonePe", "Slice", "Jupiter", "Fi Money", "Jar"
]

# ── Generate Features ──────────────────────────────────
customer_ids = [f"FD-{str(i).zfill(5)}" for i in range(1, n+1)]

plan_type = np.random.choice(
    ["Starter", "Growth", "Pro", "Enterprise"],
    n, p=[0.35, 0.30, 0.25, 0.10]
)

contract_length = np.random.choice(
    ["Monthly", "Quarterly", "Annual"],
    n, p=[0.50, 0.30, 0.20]
)

tenure_months = np.random.randint(1, 60, n)

monthly_charges = np.where(
    plan_type == "Starter", np.random.randint(999, 2999, n),
    np.where(plan_type == "Growth", np.random.randint(2999, 5999, n),
    np.where(plan_type == "Pro", np.random.randint(5999, 9999, n),
    np.random.randint(9999, 24999, n)))
)

login_frequency = np.random.randint(0, 30, n)  # times per month
feature_usage_score = np.random.randint(1, 100, n)  # out of 100
support_tickets = np.random.randint(0, 15, n)  # per month
payment_method = np.random.choice(
    ["UPI", "Credit Card", "Net Banking", "Auto Debit"],
    n, p=[0.40, 0.25, 0.20, 0.15]
)
team_size = np.random.randint(1, 50, n)
has_mobile_app = np.random.choice(["Yes", "No"], n, p=[0.60, 0.40])
onboarding_completed = np.random.choice(["Yes", "No"], n, p=[0.70, 0.30])

# ── Calculate Churn Probability (Realistic Logic) ──────
churn_prob = np.zeros(n)

# Monthly contract = higher churn
churn_prob += np.where(contract_length == "Monthly", 0.25, 0)
churn_prob += np.where(contract_length == "Quarterly", 0.10, 0)

# Low login = higher churn
churn_prob += np.where(login_frequency < 5, 0.20, 0)
churn_prob += np.where(login_frequency < 2, 0.15, 0)

# Low feature usage = higher churn
churn_prob += np.where(feature_usage_score < 30, 0.20, 0)

# High support tickets = higher churn
churn_prob += np.where(support_tickets > 8, 0.15, 0)

# Short tenure = higher churn
churn_prob += np.where(tenure_months < 6, 0.20, 0)

# High charges + low usage = higher churn
churn_prob += np.where(
    (monthly_charges > 5999) & (feature_usage_score < 40), 0.15, 0
)

# Onboarding not completed = higher churn
churn_prob += np.where(onboarding_completed == "No", 0.15, 0)

# No mobile app = slight higher churn
churn_prob += np.where(has_mobile_app == "No", 0.05, 0)

# Cap probability at 0.85
churn_prob = np.clip(churn_prob, 0, 0.85)

# Generate churn labels
churn = np.array([
    "Yes" if random.random() < p else "No"
    for p in churn_prob
])

# ── Build DataFrame ────────────────────────────────────
df = pd.DataFrame({
    "Customer_ID": customer_ids,
    "Plan_Type": plan_type,
    "Contract_Length": contract_length,
    "Tenure_Months": tenure_months,
    "Monthly_Charges_INR": monthly_charges,
    "Login_Frequency": login_frequency,
    "Feature_Usage_Score": feature_usage_score,
    "Support_Tickets": support_tickets,
    "Payment_Method": payment_method,
    "Team_Size": team_size,
    "Has_Mobile_App": has_mobile_app,
    "Onboarding_Completed": onboarding_completed,
    "Churn": churn
})

# ── Save Dataset ───────────────────────────────────────
df.to_csv("flowdesk_customers.csv", index=False)

print(f"✅ Dataset generated — {len(df)} customers!")
print(f"\nChurn Distribution:")
print(df["Churn"].value_counts())
print(f"\nChurn Rate: {df['Churn'].value_counts(normalize=True)['Yes']*100:.1f}%")
print(f"\nSample Data:")
print(df.head())
print(f"\nColumns: {df.columns.tolist()}")