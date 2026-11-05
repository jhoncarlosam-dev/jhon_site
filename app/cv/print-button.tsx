"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand hover:text-white"
    >
      Imprimir o guardar PDF
    </button>
  );
}
