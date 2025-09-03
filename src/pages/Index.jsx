import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  TrendingUp, 
  Award, 
  Target, 
  BookOpen, 
  Users, 
  Brain, 
  BarChart3, 
  Calendar, 
  User, 
  Building,
  AlertCircle
} from 'lucide-react';

// 模拟数据
const expertData = {
  name: "张专家",
  employeeId: "EXP2024001",
  department: "技术研发部",
  sequence: "技能序列",
  businessField: "配电专业",
  title: "三级拔尖技能专家",
  annualResult: "A",
  performanceScore: 92,
  targetScore: 88,
  departmentScore: 85
};

// 考核维度分组
const dimensionGroups = {
  "专业能力": ["解决问题", "工艺创新", "技术标准", "规范编制", "工作质量"],
  "创新能力": ["新技能应用", "获得专利奖励", "获得职工创新奖励", "获得大众创新奖励", "获得专利授权"],
  "人才培养": ["参加技能竞赛并获奖", "入选人才支持计划", "获得人才荣誉或奖励", "发挥人才培养作用", "知识培训授课", "人才交流"]
};

// 获取所有维度
const evaluationDimensions = Object.values(dimensionGroups).flat();

// 模拟考核数据
const assessmentData = [
  { year: '2022', 解决问题: 70, 工艺创新: 65, 技术标准: 75, 规范编制: 72, 工作质量: 68, 新技能应用: 60, 获得专利奖励: 65, 获得职工创新奖励: 55, 获得大众创新奖励: 58, 获得专利授权: 70, 参加技能竞赛并获奖: 45, 入选人才支持计划: 50, 获得人才荣誉或奖励: 65, 发挥人才培养作用: 60, 知识培训授课: 55, 人才交流: 58 },
  { year: '2023', 解决问题: 80, 工艺创新: 75, 技术标准: 82, 规范编制: 85, 工作质量: 78, 新技能应用: 72, 获得专利奖励: 75, 获得职工创新奖励: 68, 获得大众创新奖励: 70, 获得专利授权: 82, 参加技能竞赛并获奖: 58, 入选人才支持计划: 65, 获得人才荣誉或奖励: 75, 发挥人才培养作用: 70, 知识培训授课: 65, 人才交流: 68 },
  { year: '2024', 解决问题: 65, 工艺创新: 90, 技术标准: 92, 规范编制: 70, 工作质量: 92, 新技能应用: 88, 获得专利奖励: 55, 获得职工创新奖励: 85, 获得大众创新奖励: 87, 获得专利授权: 95, 参加技能竞赛并获奖: 80, 入选人才支持计划: 85, 获得人才荣誉或奖励: 92, 发挥人才培养作用: 85, 知识培训授课: 80, 人才交流: 82 }
];

// 同批次专家平均数据
const batchAverageData = [
  { year: '2022', 解决问题: 65, 工艺创新: 60, 技术标准: 70, 规范编制: 72, 工作质量: 65, 新技能应用: 55, 获得专利奖励: 60, 获得职工创新奖励: 50, 获得大众创新奖励: 55, 获得专利授权: 65, 参加技能竞赛并获奖: 40, 入选人才支持计划: 45, 获得人才荣誉或奖励: 60, 发挥人才培养作用: 55, 知识培训授课: 50, 人才交流: 52 },
  { year: '2023', 解决问题: 75, 工艺创新: 70, 技术标准: 78, 规范编制: 85, 工作质量: 75, 新技能应用: 68, 获得专利奖励: 70, 获得职工创新奖励: 62, 获得大众创新奖励: 65, 获得专利授权: 75, 参加技能竞赛并获奖: 52, 入选人才支持计划: 60, 获得人才荣誉或奖励: 70, 发挥人才培养作用: 65, 知识培训授课: 60, 人才交流: 62 },
  { year: '2024', 解决问题: 65, 工艺创新: 82, 技术标准: 85, 规范编制: 70, 工作质量: 85, 新技能应用: 80, 获得专利奖励: 55, 获得职工创新奖励: 78, 获得大众创新奖励: 80, 获得专利授权: 85, 参加技能竞赛并获奖: 70, 入选人才支持计划: 75, 获得人才荣誉或奖励: 82, 发挥人才培养作用: 78, 知识培训授课: 75, 人才交流: 77 }
];

// AI培养建议
const getTrainingSuggestions = (dimension, score) => {
  if (score >= 85) return "表现优秀，继续保持";
  if (score >= 75) return "表现良好，可进一步提升";
  
  const suggestions = {
    "解决问题": "建议参加《问题分析与解决》培训课程",
    "工艺创新": "建议参加《创新方法与工具应用》培训课程",
    "技术标准": "建议学习《行业技术标准制定与实施》专题",
    "规范编制": "建议参与《技术规范编写实务》工作坊",
    "工作质量": "建议学习《质量管理与持续改进》课程",
    "新技能应用": "建议参加《前沿技术应用与实践》培训",
    "获得专利奖励": "建议学习《专利申请与知识产权保护》课程",
    "获得职工创新奖励": "建议参与《职工创新项目申报与实施》项目",
    "获得大众创新奖励": "建议学习《大众创新项目策划与执行》课程",
    "获得专利授权": "建议参加《专利撰写与申请实务》培训",
    "参加技能竞赛并获奖": "建议参与《技能竞赛备赛与参赛技巧》培训",
    "入选人才支持计划": "建议学习《人才项目申报与实施》课程",
    "获得人才荣誉或奖励": "建议参与《人才荣誉申报与评审》项目",
    "发挥人才培养作用": "建议学习《人才培养与团队建设》课程",
    "知识培训授课": "建议参加《高效培训与授课技巧》培训",
    "人才交流": "建议参与《跨部门人才交流与实践》项目"
  };
  
  return suggestions[dimension] || "建议针对性提升相关能力";
};

const ExpertFeedbackReport = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // 计算考核维度的平均分
  const calculateAverageScores = () => {
    const averages = {};
    evaluationDimensions.forEach(dim => {
      const sum = assessmentData.reduce((acc, yearData) => acc + yearData[dim], 0);
      averages[dim] = Math.round(sum / assessmentData.length);
    });
    return averages;
  };

  const averageScores = calculateAverageScores();

  // 找出需要改进的维度
  const improvementAreas = Object.entries(averageScores)
    .filter(([_, score]) => score < 80)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5);

  // 准备发散条形图数据
  const prepareDivergingBarData = () => {
    // 初始化数据数组
    const data = [];

    // 直接处理所有维度
    evaluationDimensions.forEach(dimension => {
      // 计算2023-2024的变化
      const value2023 = assessmentData[1][dimension];
      const value2024 = assessmentData[2][dimension];
      const change = value2024 - value2023;

      data.push({
        dimension: dimension,
        dimensionId: dimension,
        change: change,
        startValue: value2023,
        endValue: value2024
      });
    });

    // 找出变化值的最大绝对值，用于设置坐标轴范围
    const maxChange = Math.max(
      ...data.map(d => Math.abs(d.change))
    );

    // 按变化值排序
    const sortedData = data.sort((a, b) => b.change - a.change);

    return {
      data: sortedData,
      maxChange: Math.ceil(maxChange * 1.2) // 给一定边界空间
    };
  };

  const divergingBarData = prepareDivergingBarData();

  // 为每个年份区间分配不同颜色
  const yearColors = {
    '2022-2023': '#8884d8',
    '2023-2024': '#82ca9d'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 报告标题 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white text-center tracking-tight">
            专家考核反馈报告
          </h1>
          <p className="text-blue-100 text-center mt-2">综合评估及发展建议</p>
        </div>

        {/* 专家基本信息 */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            专家基本信息
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center mb-2">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-slate-600 font-medium">姓名</span>
              </div>
              <span className="text-slate-900 font-semibold text-lg">{expertData.name}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center mb-2">
                <Building className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-slate-600 font-medium">员工编码</span>
              </div>
              <span className="text-slate-900 font-semibold text-lg">{expertData.employeeId}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center mb-2">
                <Building className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-slate-600 font-medium">所在部门</span>
              </div>
              <span className="text-slate-900 font-semibold text-lg">{expertData.department}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-slate-600 font-medium">专家序列</span>
              </div>
              <span className="text-slate-900 font-semibold text-lg">{expertData.sequence}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-slate-600 font-medium">业务领域</span>
              </div>
              <span className="text-slate-900 font-semibold text-lg">{expertData.businessField}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-slate-600 font-medium">专家称号</span>
              </div>
              <span className="text-slate-900 font-semibold text-lg">{expertData.title}</span>
            </div>
          </div>
        </div>

        {/* 考核结果概况 */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
            考核结果概况
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-700 font-medium">年度考核结果</span>
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-700">{expertData.annualResult}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-700 font-medium">业绩任务得分</span>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-700">{expertData.performanceScore}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-purple-700 font-medium">目标任务得分</span>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-700">{expertData.targetScore}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-orange-700 font-medium">部门任务得分</span>
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-700">{expertData.departmentScore}</div>
            </div>
          </div>
        </div>

        {/* 维度得分变化趋势图 */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
            维度得分变化趋势图
          </h2>
          <div className="h-[550px] bg-slate-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={divergingBarData.data}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 150, bottom: 25 }}
                  barSize={15}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis
                    type="number"
                    domain={[-divergingBarData.maxChange, divergingBarData.maxChange]}
                    tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}`}
                  >
                    <Label value="2023-2024年度变化" position="bottom" offset={0} />
                  </XAxis>
                  <YAxis
                    dataKey="dimension"
                    type="category"
                    width={140}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      return (
                        <text
                          x={x}
                          y={y}
                          dy={4}
                          textAnchor="end"
                          fill="#6B7280"
                          fontSize={12}
                        >
                          <tspan x={x}>
                            {payload.value}
                          </tspan>
                        </text>
                      );
                    }}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `${value > 0 ? '+' : ''}${value}分`,
                      '2023-2024变化'
                    ]}
                    labelFormatter={(label) => {
                      const item = divergingBarData.data.find(d => d.dimension === label);
                      return `${label}`;
                    }}
                  />
                  <ReferenceLine x={0} stroke="#666" strokeDasharray="3 3" />
                  <Bar
                    dataKey="change"
                    name="2023-2024变化"
                    isAnimationActive={false}
                  >
                    {divergingBarData.data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.change >= 0 ? '#4ade80' : '#f87171'}
                        opacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        {/* 同批次对比 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧对比详情 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                与同批次专家对比
              </h3>
              <div className="space-y-4">
                  {evaluationDimensions.slice(0, 10).map((dimension, index) => {
                    const expertScore = averageScores[dimension];
                    const batchAverage = (batchAverageData[0][dimension] + batchAverageData[1][dimension] + batchAverageData[2][dimension]) / 3;
                    const isAboveAverage = expertScore > batchAverage;
                    const diff = expertScore - batchAverage;
                    
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{dimension}</span>
                          <span className="text-sm font-medium">
                            <span className={isAboveAverage ? "text-green-600" : "text-red-600"}>
                              {expertScore}
                            </span>
                            <span className="text-gray-500"> / {batchAverage.toFixed(1)}</span>
                            <span className={isAboveAverage ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                              ({diff > 0 ? '+' : ''}{diff.toFixed(1)})
                            </span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${expertScore}%`,
                              backgroundColor: isAboveAverage ? '#10b981' : '#ef4444'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧最优最差维度 */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  最优三个维度
                </h3>
              <div className="space-y-3">
                  {evaluationDimensions
                    .map(dimension => ({
                      dimension,
                      expertScore: assessmentData[2][dimension],
                      batchAverage: batchAverageData[2][dimension],
                      diff: assessmentData[2][dimension] - batchAverageData[2][dimension]
                    }))
                    .sort((a, b) => b.diff - a.diff)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={index} className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          <div className="font-semibold text-gray-900">{item.dimension}</div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-sm text-gray-600">得分: <span className="font-semibold text-gray-900">{item.expertScore}</span></span>
                          <span className="text-sm font-medium px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">+{item.diff.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-rose-600" />
                待提升三个维度
              </h3>
              <div className="space-y-3">
                  {evaluationDimensions
                    .map(dimension => ({
                      dimension,
                      expertScore: assessmentData[2][dimension],
                      batchAverage: batchAverageData[2][dimension],
                      diff: assessmentData[2][dimension] - batchAverageData[2][dimension]
                    }))
                    .sort((a, b) => a.diff - b.diff)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={index} className="p-4 bg-gradient-to-br from-rose-50 to-red-50 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                          <div className="font-semibold text-gray-900">{item.dimension}</div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-sm text-gray-600">得分: <span className="font-semibold text-gray-900">{item.expertScore}</span></span>
                          <span className="text-sm font-medium px-2 py-1 bg-rose-100 text-rose-700 rounded-full">{item.diff.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

        {/* AI个人发展建议 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-3 text-blue-600" />
            AI个人发展建议
          </h2>
          <div className="h-96 px-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {improvementAreas.length > 0 ? (
                  improvementAreas.map(([dimension, score], index) => (
                    <div key={index} className="flex items-start p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 shadow-sm">
                      <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-amber-900">{dimension}</h4>
                        <div className="mt-1 text-amber-800">平均分: <span className="font-semibold">{score}</span></div>
                        <p className="text-sm text-amber-700 mt-2 leading-relaxed">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertFeedbackReport;