import { useCover } from '@/hooks/useCover';

const ExempleTemplate = () => {
  const { values } = useCover();
  const year = new Date().getFullYear();
  return (
    <div className="w-full h-full relative flex flex-col justify-end p-5">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue-900 to-transparent z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-background" />
      <div className="absolute top-5 left-5 text-2xl font-bold z-20">
        {year}
      </div>
      {values.label && (
        <div className="absolute top-5 right-5 text-2xl font-bold z-20">
          {values.label}
        </div>
      )}

      <div className="z-20">
        {/* <p>{JSON.stringify(values)}</p> */}
        {values.titleMain && <p className="text-4xl font-bold">{values.titleMain}</p>}
        {values.titleAccent && <p className="text-2xl font-bold">{values.titleAccent}</p>}
      </div>
    </div>
  );
};

export default ExempleTemplate;
