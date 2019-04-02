function testModulesListGenerableByConsole()
{
	return [
		{id: 'result_math',   modules: [GeometryPolygonTest, GeometryTest, GeometryVectorTest, DataHashTest, DataListTest, GraphTest]},
		{id: 'result_domain', modules: [BoardTest,  FigureTest                                                                      ]},
		{id: 'result_low' ,   modules: [SvgLowLevelTest                                                                             ]}
	];
}
