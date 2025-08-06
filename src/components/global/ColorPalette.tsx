import { cn } from '@/lib/components.lib';
import { getSessionUser } from "@/app/(auth)/actions";

type NavProps = {
  className?: string;
};

export default async function ColorPalette({ className }: NavProps) {
  const sessionUser = await getSessionUser();

  return (
    <>
      <section className={cn('grid grid-cols-3 w-full', className)}>
        <div className="bg-accent-primary-50">p-50</div>
        <div className="bg-accent-primary-100">p-100</div>
        <div className="bg-accent-primary-200">p-200</div>
        <div className="bg-accent-primary-300">p-300</div>
        <div className="bg-accent-primary-400">p-400</div>
        <div className="bg-accent-primary-500">p-500</div>
        <div className="bg-accent-primary-600">p-600</div>
        <div className="bg-accent-primary-700">p-700</div>
        <div className="bg-accent-primary-800">p-800</div>
        <div className="bg-accent-primary-900">p-900</div>
      </section>
      <section className={cn('grid grid-cols-3 w-full', className)}>
        <div className="bg-accent-secondary-50">s-50</div>
        <div className="bg-accent-secondary-100">s-100</div>
        <div className="bg-accent-secondary-200">s-200</div>
        <div className="bg-accent-secondary-300">s-300</div>
        <div className="bg-accent-secondary-400">s-400</div>
        <div className="bg-accent-secondary-500">s-500</div>
        <div className="bg-accent-secondary-600">s-600</div>
        <div className="bg-accent-secondary-700">s-700</div>
        <div className="bg-accent-secondary-800">s-800</div>
        <div className="bg-accent-secondary-900">s-900</div>
      </section>
    </>
  );
}
