import * as React from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { twMerge } from "tailwind-merge";

interface IProps {}

const dataRadialBar = [
  {
    id: "",
    data: [
      {
        x: "Utilisateurs",
        y: 1203,
      },
      {
        x: "Objectif",
        y: 5000,
      },
    ],
  },
];

const dataPie = [
  {
    id: "CB",
    label: "CB",
    value: 536,
    color: "hsl(353, 70%, 50%)",
  },
  {
    id: "PayPal",
    label: "PayPal",
    value: 323,
    color: "hsl(332, 70%, 50%)",
  },
  {
    id: "Apple Pay",
    label: "Apple Pay",
    value: 85,
    color: "hsl(332, 70%, 50%)",
  },
];

const dataRadar = [
  {
    region: "France",
    "Chiffre Affaire": 15040.25,
  },
  {
    region: "Belgique",
    "Chiffre Affaire": 4021.35,
  },
  {
    region: "Suisse",
    "Chiffre Affaire": 9221.53,
  },
  {
    region: "Allemagne",
    "Chiffre Affaire": 1524.15,
  },
];

const data = [
  {
    id: "Revenu cible total",
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
  interface StatLineProps {
    title: string;
    value: string;
    stat: string;
  }
  const Stat: React.FC<StatLineProps> = ({ title, value, stat }) => {
    return (
      <div className="grow border w-fit p-4 rounded-xl bg-white">
        <p className="font-semibold text-sm text-gray-500">{title}</p>
        <p className="mt-2 mb-2 font-bold text-2xl">{value}</p>
        <div className="flex flex-row gap-3 items-center">
          <p className="text-sm bg-green-100 rounded p-1">{stat}</p>
          <p className="text-sm text-gray-500">Par rapport au mois dernier</p>
        </div>
      </div>
    );
  };

  interface SessionLineProps {
    country: string;
    percentage: string;
    sessionNumber: number;
  }
  const SessionLine: React.FC<SessionLineProps> = ({
    country,
    percentage,
    sessionNumber,
  }) => {
    return (
      <div className="relative flex flex-row gap-3 pt-5 items-center">
        <span className={`fi fi-${country} w-10 h-10`}></span>
        <p className="absolute right-2 top-0 font-semibold">{sessionNumber}</p>
        <div className="bg-[#F2F3F5] rounded-xl h-5 w-full">
          <div
            className={twMerge("bg-orange-500 h-5 rounded-xl", percentage)}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#FAFBFC] h-full w-full p-4">
      <h1 className="font-bold text-2xl mb-8">Votre tableau de bord</h1>
      <div className="flex flex-row gap-4">
        <Stat
          title="Chiffre d'affaire du mois"
          value="15,324.25€"
          stat="+ 12,52%"
        />
        <Stat title="Bénéfice" value="8,132.45€" stat="+ 3,32%" />
        <Stat title="Vue total" value="324.025" stat="+ 30,65%" />
        <Stat title="Taux de conversion" value="15,2%" stat="+ 5,01%" />
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <div className="basis-2/3 flex flex-col h-96 border rounded-xl p-4 bg-white">
          <p className="font-bold">Revenue dans le temps</p>
          <ResponsiveLine
            curve="natural"
            colors={{ scheme: "category10" }}
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

        <div className="basis-1/3 flex flex-col border rounded-xl p-4 bg-white">
          <p className="font-bold">Sessions par pays</p>
          <p className="text-gray-500">
            Affichage des données par session total
          </p>
          <div className="flex flex-col gap-4 mt-3">
            <SessionLine
              percentage="w-[70%]"
              country="fr"
              sessionNumber={875}
            />
            <SessionLine
              percentage="w-[15%]"
              country="be"
              sessionNumber={187}
            />
            <SessionLine
              percentage="w-[10%]"
              country="ch"
              sessionNumber={125}
            />
            <SessionLine percentage="w-[5%]" country="de" sessionNumber={63} />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <div className="flex flex-col flex-1  border h-96 rounded-xl p-4 bg-white">
          <p className="font-bold">Revenue par pays</p>
          <ResponsiveRadar
            data={dataRadar}
            keys={["Chiffre Affaire"]}
            indexBy="region"
            margin={{ top: 70, right: 10, bottom: 40, left: 50 }}
            borderColor={{ from: "color" }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            colors={{ scheme: "category10" }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>

        <div className="flex flex-col flex-1 border rounded-xl p-4 bg-white">
          <p className="font-bold">Moyen de paiement</p>
          <ResponsivePie
            colors={{ scheme: "category10" }}
            data={dataPie}
            margin={{ top: 40, right: 20, bottom: 80, left: 20 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>

        <div className="relative flex flex-col flex-1 border rounded-xl p-4 bg-white">
          <p className="font-bold">Nombre d'utilisateurs</p>
          <ResponsiveRadialBar
            data={dataRadialBar}
            startAngle={-95}
            endAngle={95}
            innerRadius={0.4}
            padding={0.4}
            margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
            colors={{ scheme: "category10" }}
            radialAxisStart={null}
            circularAxisOuter={null}
            enableRadialGrid={false}
            enableCircularGrid={false}
          />

          <p className="absolute left-20 top-64">
            <span className="font-semibold mr-1">1203</span>
            <span className="font-medium text-gray-500">Utilisateurs</span>
          </p>

          <p className="absolute right-20 top-64">
            <span className="font-semibold mr-1">5000</span>
            <span className="font-medium text-gray-500">
              Objectif Utilisateurs
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
