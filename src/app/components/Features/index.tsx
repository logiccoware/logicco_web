import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  MessageCircle,
  Settings2,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: Settings2,
    title: "Custom Categories & Subcategories",
    description:
      "Organize your expenses and income with flexible categories and subcategories for detailed tracking.",
  },
  {
    icon: Blocks,
    title: "Multiple Accounts",
    description:
      "Manage finances across bank accounts, credit cards, and cash wallets—all in one place.",
  },
  {
    icon: Bot,
    title: "Smart Payee Management",
    description:
      "Add and track payees for every transaction, making it easy to analyze spending patterns.",
  },
  {
    icon: ChartPie,
    title: "Comprehensive Reports & Analytics",
    description:
      "Visualize your spending and income trends with interactive charts and detailed reports.",
  },
  {
    icon: Film,
    title: "Transaction History",
    description:
      "View, filter, and search your complete transaction history for quick insights.",
  },
  {
    icon: MessageCircle,
    title: "Budgeting Tools",
    description:
      "Set budgets for categories and monitor progress to stay on track with your financial goals.",
  },
];

export const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
          Unleash Your Creativity
        </h2>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border rounded-xl py-6 px-5"
            >
              <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
