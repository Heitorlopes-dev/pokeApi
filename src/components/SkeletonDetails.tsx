import Skeleton from 'react-loading-skeleton';

export function SkeletonDetails() {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row border border-gray-100">
      {/* LADO ESQUERDO: Imagem e Informações Básicas */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white border-b md:border-b-0 md:border-r border-gray-100">
        <div className="w-48 mb-2"><Skeleton height={40} /></div>
        <div className="w-16 mb-8"><Skeleton height={24} /></div>

        <div className="bg-white rounded-full p-6 mb-8 w-64 h-64 flex justify-center items-center shadow-lg border-4 border-gray-50 relative">
          <Skeleton circle width={224} height={224} />
        </div>

        <div className="flex gap-3 mt-auto">
          <div className="w-24"><Skeleton height={40} borderRadius={9999} /></div>
          <div className="w-24"><Skeleton height={40} borderRadius={9999} /></div>
        </div>
      </div>

      {/* LADO DIREITO: Detalhes, Entrada da Dex, Peso e Status Base */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="mb-8">
          <div className="w-40 mb-3"><Skeleton height={32} /></div>
          <Skeleton count={3} />
        </div>

        <div className="flex gap-8 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex flex-col gap-2">
            <div className="w-12"><Skeleton height={16} /></div>
            <div className="w-20"><Skeleton height={24} /></div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="flex flex-col gap-2">
            <div className="w-12"><Skeleton height={16} /></div>
            <div className="w-20"><Skeleton height={24} /></div>
          </div>
        </div>

        <div>
          <div className="w-40 mb-6"><Skeleton height={32} /></div>
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12"><Skeleton height={16} /></div>
                <div className="w-8"><Skeleton height={16} /></div>
                <div className="flex-1"><Skeleton height={12} borderRadius={9999} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
