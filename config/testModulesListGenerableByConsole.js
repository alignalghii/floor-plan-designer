function testModulesListGenerableByConsole()
{
	return [
		{id: 'math'            , modules: [GeometryPolygonTest, GeometryTest, GeometryVectorTest, CoordSysTransformationTest, DataHashTest, DataListTest, GraphTest]},
		{id: 'domain'          , modules: [BoardTest,  FigureTest                                                                                                  ]},
		{id: 'low-level-system', modules: [SvgLowLevelTest                                                                                                         ]},
		{id: 'DOM-mocked'      , modules: [UniqueIdderTest                                                                                                         ]}
	];
}
