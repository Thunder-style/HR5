import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building, Award, Target } from 'lucide-react';

const ExpertInfoCard = ({ expertData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">专家基本信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">姓名：</span>
            <span className="font-medium ml-1">{expertData.name}</span>
          </div>
          <div className="flex items-center">
            <Building className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">员工编码：</span>
            <span className="font-medium ml-1">{expertData.employeeId}</span>
          </div>
          <div className="flex items-center">
            <Building className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">所在部门：</span>
            <span className="font-medium ml-1">{expertData.department}</span>
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">专家序列：</span>
            <span className="font-medium ml-1">{expertData.sequence}</span>
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">业务领域：</span>
            <span className="font-medium ml-1">{expertData.businessField}</span>
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">专家称号：</span>
            <span className="font-medium ml-1">{expertData.title}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertInfoCard;
