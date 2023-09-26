import { useTimerStore } from "@/store/timerStore";
import { cubeCollection } from "@/lib/cubeCollection";
import { useState } from "react";
import { Categories } from "@/interfaces/Categories";
import genId from "@/lib/genId";
import calcAverageStatistics from "@/lib/calcAverageStatistics";
import calcTimeSpentStatistics from "@/lib/calcTimeSpentStatistics";
import calcTotalSolvesStatistics from "@/lib/calcTotalSolvesStatistics";
import calcAoStatistics from "@/lib/calcAoStatistics";
import calcDesviation from "@/lib/calcDesviation";
import calcBestTime from "@/lib/calcBestTime";

export default function CategoryStatistics() {
  const { cubes } = useTimerStore();
  const [filterCategory, setFilterCategory] = useState<Categories>("3x3");
  const [filterCube, setFilterCube] = useState<string>("All");

  const handleChangeCategory = (value: any) => {
    setFilterCategory(value);
    setFilterCube("All");
  };

  const handleChangeCube = (value: any) => {
    setFilterCube(value);
  };

  const average = calcAverageStatistics(filterCategory, filterCube);
  const timeSpent = calcTimeSpentStatistics(filterCategory, filterCube);
  const counter = calcTotalSolvesStatistics(filterCategory, filterCube);
  const stats = calcAoStatistics(filterCategory, filterCube);
  const desviation = calcDesviation(filterCategory, filterCube);
  const best = calcBestTime(filterCategory, filterCube);
  return (
    <>
      <div className="flex flex-col gap-3 px-3 py-3 grow overflow-auto">
        <div className="flex gap-3">
          <select
            onChange={(e) => handleChangeCategory(e.target.value)}
            className="bg-zinc-900 w-full border rounded-md p-1 border-zinc-800"
          >
            {cubeCollection.map((cube) => (
              <option key={cube.name} value={cube.name}>
                {cube.name}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => handleChangeCube(e.target.value)}
            className="bg-zinc-900 w-full border rounded-md p-1 border-zinc-800"
            value={filterCube}
          >
            <option value="All">All</option>
            {cubes
              ? cubes.map((cube) => {
                  if (cube.category === filterCategory) {
                    return (
                      <option key={genId()} value={cube.name}>
                        {cube.name}
                      </option>
                    );
                  }
                })
              : null}
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col justify-center items-center h-96 border rounded-md border-zinc-800 p-3 w-full">
            <div>Pending Line Chart</div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-md text-sm w-full">
          <div className="flex bg-zinc-900 p-1 rounded-md text-zinc-200 h-10 items-center">
            <div className="w-1/4"></div>
            <div className="w-1/4 text-center">All</div>
            <div className="w-1/4 text-center">C All</div>
            <div className="w-1/4 text-center">C Session</div>
          </div>
          <StatisticRow
            label="Desviation"
            valueAll={desviation.global}
            valueCube={desviation.cube}
            valueSession={desviation.session}
          />
          <StatisticRow
            label="Ao5"
            valueAll={stats.global.ao5}
            valueCube={stats.cube.ao5}
            valueSession={stats.session.ao5}
          />
          <StatisticRow
            label="Ao12"
            valueAll={stats.global.ao12}
            valueCube={stats.cube.ao12}
            valueSession={stats.session.ao12}
          />
          <StatisticRow
            label="Ao50"
            valueAll={stats.global.ao50}
            valueCube={stats.cube.ao50}
            valueSession={stats.session.ao50}
          />
          <StatisticRow
            label="Ao100"
            valueAll={stats.global.ao100}
            valueCube={stats.cube.ao100}
            valueSession={stats.session.ao100}
          />
          <StatisticRow
            label="Ao1000"
            valueAll={stats.global.ao1000}
            valueCube={stats.cube.ao1000}
            valueSession={stats.session.ao1000}
          />
          <StatisticRow
            label="Best Time"
            valueAll={best.global}
            valueCube={best.cube}
            valueSession={best.session}
          />
          <StatisticRow
            label="Average"
            valueAll={average.global}
            valueCube={average.cube}
            valueSession={average.session}
          />
          <StatisticRow
            label="Time Spent"
            valueAll={timeSpent.global}
            valueCube={timeSpent.cube}
            valueSession={timeSpent.session}
          />
          <StatisticRow
            label="Counter"
            valueAll={counter.global}
            valueCube={counter.cube}
            valueSession={counter.session}
          />
        </div>
      </div>
    </>
  );
}

function StatisticRow({
  label,
  valueAll,
  valueSession,
  valueCube,
}: {
  label: string;
  valueAll: number | string;
  valueSession: number | string;
  valueCube: number | string;
}) {
  return (
    <div className="flex rounded-md text-zinc-400 text-xs h-10 items-center hover:bg-zinc-700">
      <div className="ps-3 w-1/4">{label}</div>
      <div className="w-1/4 text-center">{valueAll}</div>
      <div className="w-1/4 text-center">{valueCube}</div>
      <div className="w-1/4 text-center">{valueSession}</div>
    </div>
  );
}
