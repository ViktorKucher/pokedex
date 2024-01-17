type LoaderType = {
  typeLoading?: "fullPage";
};
const loaderStyle = {
    'fullPage':'flex flex-col m-0 gap-2 w-full max-w-64 items-center p-0 h-screen justify-center',
    undefined:''
}
export const Loader = ({ typeLoading }: LoaderType) => {
  return (
    <div className={loaderStyle[typeLoading as keyof typeof loaderStyle]}>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};
