"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaginationBlogProps {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  cat?: string;
}

const PaginationBlog: React.FC<PaginationBlogProps> = ({
  page,
  hasNext,
  hasPrev,
  cat
}) => {

  const router = useRouter()

  const goToPage = (newPage: number) => {
    const url = cat ? `/blog?category=${cat}&page=${newPage}` : `?page=${newPage}`;
    router.push(url);
  };

  return (
    <div className="my-5">
      <div className="flex justify-between">
        <div>
          <Button 
            variant="outline" 
            disabled={!hasPrev || page === 1}
            onClick={() => goToPage(page - 1)}
          >
            <div className="flex items-center gap-2">
              <ChevronLeft size={20} />
              <p>Previous</p>
            </div>
          </Button>
        </div>
        <div>
          <Button 
            variant="outline" 
            disabled={!hasNext}
            onClick={() => goToPage(page + 1)}
          >
            <div className="flex items-center gap-2">
              <p>Next</p>
              <ChevronRight size={20} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationBlog;
