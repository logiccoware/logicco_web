import { Button } from "@/components/ui/button";
import { MONOVRA_APP_LINK } from "@/lib/contants";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Track & Manage Your Personal Finances Effortlessly
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Gain clarity and control over your money. Monitor expenses, set
          budgets, and achieve your financial goals with intuitive tools
          designed for your everyday life.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full text-base">
            <a href={MONOVRA_APP_LINK} target="_blank" rel="noreferrer">
              Get Started
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
