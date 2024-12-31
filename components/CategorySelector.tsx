"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ALL_CATEGORY_QUERYResult } from "@/sanity.types";
import { useRouter } from "next/navigation";

interface CategorySelectorProps {
  categories: ALL_CATEGORY_QUERYResult;
}

export function CategorySelector({ categories }: CategorySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="sm:w-[200px] text-center w-full justify-between bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
          >
            {value
              ? categories.find((category) => category.title === value)?.title
              : "Filter By Category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No Category found.</CommandEmpty>
              <CommandGroup>
                {categories &&
                  categories.map((category) => (
                    <CommandItem
                      key={category._id}
                      value={category.title}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        if (category.slug) {
                          router.push(`/category/${category.slug.current}`);
                        }
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === category.title ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
