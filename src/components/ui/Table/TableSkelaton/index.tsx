import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showCheckbox?: boolean;
  showPagination?: boolean;
  className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  showCheckbox = false,
  showPagination = true,
  className = '',
}) => {
  // Generate array for rows and columns
  const rowsArray = Array.from({ length: rows }, (_, i) => i);
  const columnsArray = Array.from({ length: columns }, (_, i) => i);

  return (
    <div className={`w-full bg-transparent p-2 rounded ${className}`}>
      {/* Table Container */}
      <div className="w-full bg-transparent border-0 rounded overflow-hidden">
        {/* Table Header */}
        <div className="bg-transparent border-b border-light-gray">
          <div className="flex items-center h-14 px-4">
            {/* Checkbox column if enabled */}
            {showCheckbox && (
              <div className="w-12 flex justify-center">
                <div className="w-4 h-4 bg-light-gray/30 rounded animate-pulse"></div>
              </div>
            )}
            
            {/* Header columns */}
            {columnsArray.map((col) => (
              <div key={`header-${col}`} className="flex-1 px-4">
                <div 
                  className="h-4 bg-white/20 rounded animate-pulse"
                  style={{ 
                    width: col === 0 ? '60%' : col === columnsArray.length - 1 ? '80%' : '70%' 
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Body */}
        <div className="bg-transparent">
          {rowsArray.map((row) => (
            <div 
              key={`row-${row}`} 
              className="flex items-center h-12 px-4 bg-card hover:bg-dark-brown/50 border-b border-dark-brown/50 last:border-b-0"
            >
              {/* Checkbox column if enabled */}
              {showCheckbox && (
                <div className="w-12 flex justify-center">
                  <div className="w-4 h-4 bg-light-gray/30 rounded animate-pulse"></div>
                </div>
              )}
              
              {/* Data columns */}
              {columnsArray.map((col) => {
                // Create deterministic widths based on row and column index
                const widthVariations = [65, 75, 85, 55, 90, 60, 80, 70];
                const width = widthVariations[(row + col) % widthVariations.length];
                
                return (
                  <div key={`cell-${row}-${col}`} className="flex-1 px-4">
                    <div 
                      className="h-3 bg-light-gray/20 rounded animate-pulse"
                      style={{ 
                        width: `${width}%`,
                        animationDelay: `${col * 0.1}s`
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        {showPagination && (
          <div className="bg-transparent border-t border-light-gray p-4 flex justify-between items-center">
            {/* Left side - Rows per page */}
            <div className="flex items-center space-x-2">
              <div className="h-3 w-16 bg-light-gray/20 rounded animate-pulse"></div>
              <div className="h-6 w-12 bg-light-gray/20 rounded animate-pulse"></div>
            </div>

            {/* Center - Page info */}
            <div className="flex items-center space-x-4">
              <div className="h-3 w-24 bg-light-gray/20 rounded animate-pulse"></div>
            </div>

            {/* Right side - Navigation buttons */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-light-gray/20 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-light-gray/20 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-light-gray/20 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-light-gray/20 rounded animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Compact version for smaller spaces
export const CompactTableSkeleton: React.FC<Omit<TableSkeletonProps, 'showPagination'>> = (props) => (
  <TableSkeleton {...props} showPagination={false} rows={3} />
);

// Full-featured version with more customization
export const FullTableSkeleton: React.FC<TableSkeletonProps & { 
  title?: boolean;
  toolbar?: boolean;
}> = ({ 
  title = false, 
  toolbar = false, 
  ...props 
}) => (
  <div className="w-full space-y-4">
    {/* Title skeleton */}
    {title && (
      <div className="h-6 w-48 bg-light-gray/20 rounded animate-pulse"></div>
    )}
    
    {/* Toolbar skeleton */}
    {toolbar && (
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="h-9 w-24 bg-light-gray/20 rounded animate-pulse"></div>
          <div className="h-9 w-20 bg-light-gray/20 rounded animate-pulse"></div>
        </div>
        <div className="h-9 w-32 bg-primary/20 rounded animate-pulse"></div>
      </div>
    )}
    
    <TableSkeleton {...props} />
  </div>
);

export default TableSkeleton;