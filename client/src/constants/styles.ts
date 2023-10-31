export const modalCustomStyle = (screenSize: any) => {
  let style = {
    overlay: {
      background: "rgb(14 13 13 / 60%)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      with: "1000px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
    },
  }

  return style
}

export const ModalStyle = {
  container: 'sm:w-[400px] md:w-[600px] w-[300px] flex flex-col gap-3"',
  header: "flex items-baseline justify-between mb-5",
  title: "font-semibold text-base text-[1.3rem]",
  closeIcon: "text-[2rem] cursor-pointer",
  input:
    "w-full p-1 border border-gray-200 rounded-md hover:outline-none outline-none",
  errorTitle: "text-red-500 text-sm",
  priority: "border rounded-lg px-3 py-1 cursor-pointer",
  equalCol: "flex flex-col gap-2",
  buttonContainer: "flex justify-end my-5 md:my-0",
}

export const MainStyle = {
  cardContainer: "flex flex-col gap-4 mb-6",
  container: "flex flex-col md:w-10/12 w-11/12 gap-4 mb-6",
  pageContainer: "flex gap-5 justify-center mt-4",
  perPage: "outline-none hover:outline-none py-1 px-5 rounded-md",
  noResult: "text-red-400 text-center my-12",
}

export const SettingStyle = {
  container: "px-1 pb-4 flex justify-end gap-5 border-b border-gray-300",
  searchBar:
    "py-1 pr-8 pl-4 outline-none hover:outline-none rounded-md text-gray-600 md:w-[230px] w-[150px] sm:w-[180px]",
  searchIcon: "absolute translate-y-1/2 right-0 mr-2",
  sortBy: "outline-none hover:outline-none py-1 px-3 rounded-md",
}

export const LayoutStyle = {
  container: "flex flex-col gap-2 justify-center items-center",
}

export const HeaderStyle = {
  container:
    "w-full flex justify-between px-8 py-3 bg-basic shadow-lg sticky top-0",
}

export const CardStyle = {
  container:
    "grid grid-cols-12 gap-4 items-start sm:px-5 px-3 py-3 rounded-md bg-white shadow-md",
  titleColor: "text-gray-500",
  actionContainer:
    "col-span-2 flex sm:justify-center justify-end gap-1 sm:gap-3 sm:text-lg text-sm",
}

export const ButtonStyle = {
  IconButton:
    "flex items-center gap-3 py-2 px-3 bg-second text-white font-semibold rounded-md shadow-lg",
  PrimaryButton:
    "py-1 md:py-2 px-4 bg-second text-white font-normal md:font-semibold rounded-md shadow-lg",
}
