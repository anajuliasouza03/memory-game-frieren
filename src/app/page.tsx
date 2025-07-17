"use client";

import icon from "@/assets/icon.jpeg";

import { Button } from "@/components/Button";
import { InfoItem } from "@/components/InfoItem";
import { GridItemType } from "@/types/GridItemType";
import { Github, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { items } from "@/data/items";
import { GridItem } from "@/components/GridItem";
import { formatTimeElapsed } from "@/helpers/formatTimeElapsed";

export default function Page() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    //qnd carrega a pagina dispara
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    //verificar se tá ambos abertos

    if (shownCount === 2) {
      //dois estão abertos
      let opened = gridItems.filter((item) => item.shown === true);
      //se esses abertos forem 2
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          //se os dois são iguais, faz permantentShown true
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanenShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          //os dois abertos não são iguais
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }

        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanenShown === true)
    ) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    //resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    //criar grid
    //criar grid vazio
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanenShown: false,
      });
    }

    //preencher grid vazio
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < items.length; k++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          //ta preenchido? gera nova posição
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = k;
      }
    }

    //jogar o grid no state de grid
    setGridItems(tmpGrid);

    //comecar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if (
        tmpGrid[index].permanenShown === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tmpGrid);
    }
  };

  return (
    <div className="w-full max-w-[1000px] m-auto flex p-12 flex-col md:flex-row gap-2 justify-center">
      {/* info */}
      <div className="flex flex-col md:w-[150px] items-center mb-5">
        <div className="block mx-auto mb-3">
          <Image
            src={icon}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        <div className="text-[16px]">Jogo da Memória</div>
        <div className="text-[20px] font-bold mb-3">Frieren </div>

        <div className="flex justify-center items-center mb-3">
          <a href="https://github.com/anajuliasouza03/memory-game-frieren.git" className="border p-2 rounded-md">
            <Github width={15} height={15} />
          </a>
        </div>

        <div className="w-full  text-center flex  justify-around md:flex md:flex-col">
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </div>
        <Button
          label="Reiniciar"
          icon={<RotateCcw width={20} height={20} />}
          onClick={resetAndCreateGrid}
        />
      </div>

      {/* grid area */}
      <div className="flex-1 flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5 w-[430px]">
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
