import TodoList from "@/components/TodoList";

export default function MainPage() {
  return (
    <>
      <div className="flex flex-col w-full gap-[30px] bg-[#f7f7f7]">
        <div className="self-stretch h-[70px] bg-[#fff]" />
        <div className="w-[90%] mx-auto">
          <TodoList />
        </div>
      </div>
    </>
  );
}
