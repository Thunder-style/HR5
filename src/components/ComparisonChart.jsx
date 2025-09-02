import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingDown, TrendingUp } from 'lucide-react';

const ComparisonChart = ({ dimensions, expertScores, batchAverages }) => {
  // 计算每个维度的差异
  const dimensionDifferences = dimensions.map(dimension => ({
    dimension,
    expertScore: expertScores[dimension],
    batchAverage: batchAverages[dimension],
    difference: expertScores[dimension] - batchAverages[dimension]
  }));

  // 找出最优的三个维度（差异最大的正数）
  const topThree = dimensionDifferences
    .filter(item => item.difference > 0)
    .sort((a, b) => b.difference - a.difference)
    .slice(0, 3);

  // 找出最差的三个维度（差异最小的负数）
  const bottomThree = dimensionDifferences
    .filter(item => item.difference < 0)
    .sort((a, b) => a.difference - b.difference)
    .slice(0, 3);

  // 获取所有需要高亮的维度
  const highlightedDimensions = [
    ...topThree.map(item => item.dimension),
    ...bottomThree.map(item => item.dimension)
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="w-5 h-5 mr-2" />
          与同批次专家对比
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dimensions.slice(0, 10).map((dimension, index) => {
            const expertScore = expertScores[dimension];
            const batchAverage = batchAverages[dimension];
            const isAboveAverage = expertScore > batchAverage;
            const isTopThree = topThree.some(item => item.dimension === dimension);
            const isBottomThree = bottomThree.some(item => item.dimension === dimension);
            
            return (
              <div key={index} className={`p-2 rounded-lg ${isTopThree ? 'bg-green-50 border border-green-200' : isBottomThree ? 'bg-red-50 border border-red-200' : ''}`}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    {dimension}
                    {isTopThree && <TrendingUp className="w-4 h-4 text-green-600 ml-1" />}
                    {isBottomThree && <TrendingDown className="w-4 h-4 text-red-600 ml-1" />}
                  </span>
                  <span className="text-sm font-medium">
                    <span className={isAboveAverage ? "text-green-600" : "text-red-600"}>
                      {expertScore}
                    </span>
                    <span className="text-gray-500"> / {batchAverage.toFixed(1)}</span>
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${expertScore}%`,
                      backgroundColor: isTopThree ? '#10b981' : isBottomThree ? '#ef4444' : isAboveAverage ? '#10b981' : '#ef4444'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
