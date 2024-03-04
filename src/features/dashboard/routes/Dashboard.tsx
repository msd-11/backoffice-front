import * as React from "react";
import { ResponsiveLine } from "@nivo/line";

interface IProps {}

const data = [
  {
    id: "Revenu estimée total",
    color: "hsl(38.8, 100%, 50%)",
    data: [
      { x: "Jan 2024", y: 7865 },
      { x: "Feb 2024", y: 8200 },
      { x: "Mar 2024", y: 8900 },
      { x: "Apr 2024", y: 7800 },
      { x: "May 2024", y: 7200 },
      { x: "Jun 2024", y: 6400 },
      { x: "Jul 2024", y: 10000 },
      { x: "Aug 2024", y: 8600 },
      { x: "Sep 2024", y: 9200 },
      { x: "Oct 2024", y: 10000 },
      { x: "Nov 2024", y: 12000 },
      { x: "Dec 2024", y: 13000 },
      // Add more data points as needed
    ],
  },

  {
    id: "Revenue total",
    color: "hsl(147, 50%, 47%)",
    data: [
      { x: "Jan 2024", y: 7243 },
      { x: "Feb 2024", y: 8021 },
      { x: "Mar 2024", y: 9301 },
      { x: "Apr 2024", y: 8156 },
      { x: "May 2024", y: 7245 },
      { x: "Jun 2024", y: 6478 },
      { x: "Jul 2024", y: 10234 },
      { x: "Aug 2024", y: 8756 },
      { x: "Sep 2024", y: 9352 },
      { x: "Oct 2024", y: 10325 },
      { x: "Nov 2024", y: 12123 },
      { x: "Dec 2024", y: 13456 },
    ],
  },
  // Add more lines as needed
];

const Dashboard: React.FC<IProps> = () => {
  const Stat = () => {
    return (
      <div className="grow border w-fit p-4 rounded-xl bg-white">
        <p className="font-semibold text-sm text-gray-500">
          Chiffre d'affaire semaine
        </p>
        <p className="mt-2 mb-2 font-bold text-2xl">15,324.25€</p>
        <p>+12,52%</p>
      </div>
    );
  };

  return (
    <div className="bg-[#FAFBFC] h-full w-full p-4">
      <div className="flex flex-row gap-4">
        <Stat />
        <Stat />
        <Stat />
        <Stat />
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <div className="basis-2/3 flex flex-col h-96 border rounded-xl p-4 bg-white">
          <p className="font-bold">Revenue dans le temps</p>
          <ResponsiveLine
            curve="natural"
            colors={{ scheme: "set1" }}
            data={data}
            margin={{ top: 50, right: 50, bottom: 30, left: 30 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={{
              tickValues: 4,
            }}
            axisLeft={null}
            axisBottom={{ tickValues: 2 }}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-left",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: -30,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 100,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>

        <div className="basis-1/3 flex flex-row border rounded-xl p-4 bg-white">
          <p className="font-bold">Session par pays</p>
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <div className="basis-1/3 flex flex-row border rounded-xl p-4 bg-white">
          <p className="font-bold">Revenue dans le temps</p>
        </div>

        <div className="basis-1/3 flex flex-row border rounded-xl p-4 bg-white">
          <p className="font-bold">Session par pays</p>
        </div>

        <div className="basis-1/3 flex flex-row border rounded-xl p-4 bg-white">
          <p className="font-bold">Revenue dans le temps</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
