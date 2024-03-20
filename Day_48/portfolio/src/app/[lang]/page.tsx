import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Image, Tooltip } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import Avatar from "../../assets/images/avatar.jpg";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { home } = await getDictionary(lang);
  return (
    <div className="light light:bg-white dark dark:bg-zinc-900 shadow-lg rounded-lg p-4">
      <div className="flex flex-col gap-4 p-3 justify-center items-center mb-5">
        <h1 className="text-2xl font-bold text-center">{home.self.name}</h1>
        <p className="text-lg text-center">{home.self.desc}</p>
      </div>
      <div className="flex gap-10">
        <div className="hidden md:w-[400px] md:flex flex-col gap-3">
          <div>
            <div className="shadow-large rounded-2xl">
              <Image
                isZoomed={true}
                // width={240}
                alt="NextUI Fruit Image with Zoom"
                src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/57154246_2321760988059808_3060512825190383616_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEAPg63iTBYRoQt2dvzCyWI19a1sFdpwDTX1rWwV2nANN1Befyo8IcdFvCeZybUOUQyOgtct5Klda0b8NxHOJci&_nc_ohc=l7g8UH_jQu4AX92FjkT&_nc_ht=scontent.fhan2-4.fna&oh=00_AfBzOZVAfpZQaHZmyL3poHoloFlO-x2PQTpYM_GF5hfXQA&oe=6621B5C5"
              />
            </div>
            <p className="text-center mt-2">Frontend Developer</p>
          </div>
          <div className="mb-5">
            <h2 className="text-2xl font-bold mb-3">{home.skills.title}</h2>
            <ul className="flex-col gap-3 flex">
              {home.skills.skill.map((item) => (
                <li>
                  <span className="font-bold">{item.title}</span>: {item.desc}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">{home.history.title}</h2>
            <ul className="flex-col gap-3 flex">
              {home.history.timeline.map((item) => (
                <li>
                  <span className="font-bold">{item.year}</span>: {item.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="shadow-medium rounded-lg p-5">
            <div className="p-3 mb-4">
              <h2 className="text-center text-xl font-bold">
                {home.projects.title}
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              {home.projects.project.map((item) => (
                <div className="flex flex-col gap-3">
                  <span className="text-xl font-semibold">{item.name}</span>
                  <p>{item.desc}</p>
                  <div className="flex gap-3">
                    <Tooltip content={item.link}>
                      <Link href={item.link} underline="hover" target="_blank">
                        Demo
                      </Link>
                    </Tooltip>
                    {/* <Tooltip content="https://github.com/Vietha22/f8_fullstack_k4/tree/main/Day_48">
                      <Link
                        href="https://github.com/Vietha22/f8_fullstack_k4/tree/main/Day_48"
                        underline="hover"
                        target="_blank"
                      >
                        Code
                      </Link>
                    </Tooltip> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div>
            <h2 className="text-2xl font-semibold text-center mb-3">
              {home.hobbies.title}
            </h2>
            <ul className="list-none flex flex-col gap-2">
              {home.hobbies.hobby.map((item) => (
                <li className="list-inside">
                  <span className="capitalize">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
      <div className="p-3 h-auto flex w-full items-center overflow-hidden subpixel-antialiased rounded-b-large pt-0.5 text-center justify-center">
        {home.footer}
      </div>
    </div>
  );
}
