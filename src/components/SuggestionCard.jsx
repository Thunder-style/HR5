import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Target, AlertCircle } from 'lucide-react';

const SuggestionCard = ({ improvementAreas, getTrainingSuggestions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="w-5 h-5 mr-2" />
          AI个人发展建议
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {improvementAreas.length > 0 ? (
              improvementAreas.map(([dimension, score], index) => (
                <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">{dimension} (平均分: {score})</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      {getTrainingSuggestions(dimension, score)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>恭喜！您在所有考核维度上表现优秀，暂无改进建议。</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SuggestionCard;
