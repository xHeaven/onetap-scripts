UI.AddSliderInt("Render distance", 0, 50)

function drawing() {
    if (Entity.IsValid(Entity.GetLocalPlayer()) == true) {
        origin = Entity.GetRenderOrigin(Entity.GetLocalPlayer())
        render = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Render distance")
        for (i = 0; i < mirage.length; i++) {
            distance = get_metric_distance(origin, mirage[i][0])
            if (distance <= render) {
                outlined_poly(mirage[i][0], mirage[i][1], mirage[i][2], mirage[i][3], [0, 255, 0, 255], [0, 255, 0, 80])
            }
        }
    }
}
Cheat.RegisterCallback("Draw", "drawing")

function outlined_poly(pos1, pos2, pos3, pos4, outline_color, inner_color) {
    w2s_1 = Render.WorldToScreen(pos1)
    w2s_2 = Render.WorldToScreen(pos2)
    w2s_3 = Render.WorldToScreen(pos3)
    w2s_4 = Render.WorldToScreen(pos4)
    Render.Line(w2s_1[0], w2s_1[1], w2s_2[0], w2s_2[1], [outline_color[0], outline_color[1], outline_color[2], outline_color[3]])
    Render.Line(w2s_2[0], w2s_2[1], w2s_3[0], w2s_3[1], [outline_color[0], outline_color[1], outline_color[2], outline_color[3]])
    Render.Line(w2s_3[0], w2s_3[1], w2s_4[0], w2s_4[1], [outline_color[0], outline_color[1], outline_color[2], outline_color[3]])
    Render.Line(w2s_4[0], w2s_4[1], w2s_1[0], w2s_1[1], [outline_color[0], outline_color[1], outline_color[2], outline_color[3]])
    Render.Polygon([
        [w2s_1[0], w2s_1[1]],
        [w2s_2[0], w2s_2[1]],
        [w2s_3[0], w2s_3[1]]
    ], [inner_color[0], inner_color[1], inner_color[2], inner_color[3]])
    Render.Polygon([
        [w2s_1[0], w2s_1[1]],
        [w2s_3[0], w2s_3[1]],
        [w2s_4[0], w2s_4[1]]
    ], [inner_color[0], inner_color[1], inner_color[2], inner_color[3]])
}
var mirage = [
    [
        [-759.5300903320313, -1288.185791015625, -114.79825592041016],
        [-753.7603759765625, -1288.03125, -114.35870361328125],
        [-753.0855712890625, -1288.03125, -121.74357604980469],
        [-760.0167236328125, -1288.21142578125, -121.2785415649414]
    ],
    [
        [767.6710815429688, -1215.112060546875, -175.85836791992188],
        [768, -1220.67724609375, -172.28768920898438],
        [768, -1221.155029296875, -216.18447875976563],
        [767.6995849609375, -1215.1976318359375, -215.72315979003906]
    ],
    [
        [-1108.50390625, -714.071044921875, -89.3158187866211],
        [-1104.03125, -791.6300048828125, -89.08135223388672],
        [-1104.03125, -791.33837890625, -160.38870239257813],
        [-1112.408447265625, -747.3838500976563, -153.089599609375]
    ],
    [
        [-1598.8062744140625, 647.9403076171875, 54.639862060546875],
        [-1522.1544189453125, 647.892333984375, 55.30023193359375],
        [-1521.3094482421875, 647.96875, -53.107269287109375],
        [-1599.251708984375, 647.89697265625, -51.091156005859375]
    ],
    [
        [-1224.03125, 451.6722717285156, -28.33130645751953],
        [-1224.03125, 396.3892517089844, -28.58281707763672],
        [-1227.799560546875, 396.2127685546875, -82.23603820800781],
        [-1227.8656005859375, 451.8992614746094, -82.45088195800781]
    ],
    [
        [-1432.03125, -2005.86669921875, -181.47796630859375],
        [-1432.03125, -2005.7012939453125, -188.74171447753906],
        [-1432.03125, -2012.3944091796875, -196.01036071777344],
        [-1432.03125, -2003.3271484375, -196.27003479003906]
    ],
    [
        [-1706.209716796875, -1192.03125, -188.3101806640625],
        [-1664.337158203125, -1192.03125, -188.73507690429688],
        [-1664.5250244140625, -1192.03125, -193.9404754638672],
        [-1706.5677490234375, -1192.03125, -195.4590606689453]
    ],
    [
        [-1344.9102783203125, -1124.0150146484375, -106.10140991210938],
        [-1344.9180908203125, -1144.526611328125, -106.57062530517578],
        [-1344.7666015625, -1145.8980712890625, -115.87185668945313],
        [-1344.7161865234375, -1123.571044921875, -115.29850769042969]
    ],
    [
        [-1694.8173828125, -711.96875, -95.71099853515625],
        [-1718.8209228515625, -711.96875, -96.50920867919922],
        [-1717.247314453125, -711.96875, -116.633544921875],
        [-1693.76025390625, -711.96875, -115.08055114746094]
    ],
    [
        [-1961.547607421875, -263.6301574707031, -99.01412200927734],
        [-1994.5517578125, -263, -99.59333038330078],
        [-1995.080322265625, -263, -121.8019027709961],
        [-1962.2275390625, -263.5848693847656, -121.8282699584961]
    ],
    [
        [-2096.03125, 777.8741455078125, -46.76616668701172],
        [-2096.03125, 738.4546508789063, -46.61885070800781],
        [-2096.110107421875, 738.1190185546875, -50.30070114135742],
        [-2096.0966796875, 777.9088745117188, -50.90393829345703]
    ],
    [
        [-1008.7379150390625, 497.0427551269531, -79.96875],
        [-1071.418701171875, 496.552978515625, -79.96875],
        [-1072.451904296875, 499.31707763671875, -79.96875],
        [-1009.130859375, 503.7605895996094, -79.96875]
    ],
    [
        [-712.03125, 637.026123046875, -5.404125213623047],
        [-687.1768188476563, 632, -5.44864559173584],
        [-708.651611328125, 631.96875, -27.574962615966797],
        [-711.9501953125, 631.96875, -32.792842864990234]
    ],
    [
        [-722.3099365234375, 336.20135498046875, -12.602973937988281],
        [-734.2049560546875, 336.03125, -12.850749969482422],
        [-735.02392578125, 343.03125, -62.786590576171875],
        [-723.5491943359375, 343.03125, -61.2894287109375]
    ],
    [
        [-479.96875, 722.6007690429688, 3.0076732635498047],
        [-479.96875, 739.4571533203125, 3.1307363510131836],
        [-479.96875, 739.33203125, -20.654367446899414],
        [-479.96875, 722.6583251953125, -20.810890197753906]
    ],
    [
        [247.08755493164063, 738.03125, -68.66159057617188],
        [201.017333984375, 738.03125, -68.51812744140625],
        [201.73851013183594, 738.03125, -103.34590148925781],
        [247.41131591796875, 738.03125, -103.65203094482422]
    ],
    [
        [1198.9068603515625, 152.03123474121094, -164.70065307617188],
        [1092.3104248046875, 152.03125, -164.63172912597656],
        [1092.373291015625, 152.03126525878906, -170.5931854248047],
        [1198.7532958984375, 152.03125, -170.1802215576172]
    ],
    [
        [200.03125, -2085.478271484375, 23.345813751220703],
        [200.03125, -2059.183837890625, 23.24342155456543],
        [200.03131103515625, -2059.27197265625, -32.816162109375],
        [200.03125, -2086.415283203125, -33.22163009643555]
    ],
    [
        [140.20034790039063, -2088, 9.944999694824219],
        [129.38174438476563, -2088, 9.707225799560547],
        [129.62783813476563, -2088, 5.526701927185059],
        [140.00357055664063, -2088, 5.0834856033325195]
    ],
    [
        [-283.45111083984375, -2036.6546630859375, -38.290374755859375],
        [-231.55093383789063, -2090.16845703125, -37.54265594482422],
        [-240.08978271484375, -2094.23046875, -46.74189758300781],
        [-283.341064453125, -2037.8677978515625, -46.82770538330078]
    ],
    [
        [480.09521484375, 376.139404296875, -188.34033203125],
        [450.1805419921875, 346.2247619628906, -188.3468780517578],
        [451.554931640625, 346.59912109375, -219.6472930908203],
        [483.3647766113281, 376.40899658203125, -219.27891540527344]
    ],
    [
        [-158.99993896484375, -328.03125, -100.2213363647461],
        [-153.30906677246094, -328.03125, -100.06389617919922],
        [-153.69284057617188, -328.03125, -118.04434204101563],
        [-158.970166015625, -328.03125, -118.35952758789063]
    ],
    [
        [-750.760498046875, -807.96875, -118.12488555908203],
        [-766.712158203125, -807.96875, -117.61351013183594],
        [-765.6900024414063, -807.96875, -145.52633666992188],
        [-748.012939453125, -807.96875, -145.3214874267578]
    ],
    [
        [-1095.6446533203125, 327.96875, -126.13551330566406],
        [-1075.3404541015625, 327.96875, -126.59744262695313],
        [-1077.044921875, 327.96875, -142.53811645507813],
        [-1095.322265625, 327.96875, -132.8736572265625]
    ],
    [
        [-1070.9136962890625, 327.96875, -146.44400024414063],
        [-1066.911865234375, 321.44537353515625, -144.53390502929688],
        [-1066.6304931640625, 321.10784912109375, -153.53164672851563],
        [-1075.91943359375, 323.96875, -154.04843139648438]
    ]

]

function get_metric_distance(a, b) {
    return Math.floor(Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2)) * 0.0254);
}