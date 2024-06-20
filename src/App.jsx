import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function App () {
  const [koders, setKoders] = useState([]);

  const {
    register,
    handleSubmit,
    formState: {errors, isValid, isSubmitted},
    reset
  } = useForm();

  function onSubmit (data) {
    setKoders([...koders, {nombre: data.koderName, apellido: data.koderLastName, email: data.koderMail}]);
    reset();
  };

  function removeKoder (indexToRemove) {
    const newKodersList = koders.filter((koder, index) => index != indexToRemove);
    setKoders(newKodersList)
  };
  
  return (
    <main className="w-full min-h-screen">
      <form className="flex flex-grow gap-2 justify-center p-5"
            onSubmit={handleSubmit(onSubmit)}>
              <input type="text" 
                    placeholder="Ingresa tu nombre"
                    className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500 bg-red-300": errors.koderName})}
                    {...register('koderName', {
                      required: {value: true, message: 'Campo requerido'},
                      minLength: {value: 2, message: 'Se requieren minimo 2 caracteres'},
                      maxLength: {value: 100, message: 'Demasiados caracteres'}
                    })}
              />

              <input type="text" 
                    placeholder="Ingresa tu apellido"
                    className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500 bg-red-300": errors.koderLastName})}
                    {...register('koderLastName', {
                      required: {value: true, message: 'Campo requerido'},
                      minLength: {value: 2, message: 'Se requieren minimo 2 caracteres'},
                      maxLength: {value: 100, message: 'Demasiados caracteres'}
                    })}
              />

              <input type="email" 
                    placeholder="Ingresa tu email"
                    className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500 bg-red-300": errors.koderMail})}
                    {...register('koderMail', {
                      required: {value: true, message: 'Campo requerido'},
                      pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Correo inválido'}
                    })}
              />

              <button
                className="text-black px-3 rounded bg-white disabled:bg-stone-400"
                disabled={isSubmitted ? !isValid : false}
              >Agregar koder</button>
      </form>

      {errors.koderName && (<p className="text-red-500 text-center text-sm font-semibold">{errors.koderName?.message}</p>)}
      {errors.koderLastName && (<p className="text-red-500 text-center text-sm font-semibold">{errors.koderLastName?.message}</p>)}
      {errors.koderMail && (<p className="text-red-500 text-center text-sm font-semibold">{errors.koderMail?.message}</p>)}

      <div className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-1 items-center">
      {
        koders.length === 0 && (<p className="text-white/50">No tienes koders registrados 😒</p>)
      }

      {
        koders.map((koder, idx) => {
          return (
            <div key={`koder-${idx}`} className="bg-white/10 rounded p-4 flex flex-row justify-between gap-3">
              <span className="select-none text-slate-200"><span className="select-none text-white font-bold">Nombre:</span> {koder.nombre}</span>
              <span className="select-none text-slate-200"><span className="select-none text-white font-bold">Apellido:</span> {koder.apellido}</span>
              <span className="select-none text-slate-200"><span className="select-none text-white font-bold">Email:</span> {koder.email}</span>
              <span className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-5 text-center items-center flex" onClick={() => removeKoder(idx)}>X</span>
            </div>
          )
        })
      }
    </div>
    </main>
  )
}