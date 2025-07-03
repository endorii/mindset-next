interface IDataListWrapperProps {
    existData: object[];
    alternativeText: string;
    children: (item: any, index: number) => React.ReactNode;
}

function DataListWrapper({
    existData,
    alternativeText,
    children,
}: IDataListWrapperProps) {
    return (
        <>
            {existData.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full pt-[120px] gap-[20px]">
                    {existData.map((item: object, i: number) =>
                        children(item, i)
                    )}
                </ul>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="text-white text-center mt-[230px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                        {alternativeText}
                    </div>
                </div>
            )}
        </>
    );
}

export default DataListWrapper;
