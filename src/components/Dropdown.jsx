import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdSwitchAccount } from "react-icons/md";
import { resetPassword } from "../services/authentication";
import { getSubscriptionPortal } from "../services/stripe";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ user, logout, resetPasswordToggle }) {
	const createPortal = async () => {
		if (user.id) {
			const portal = await getSubscriptionPortal(user.id);
			window.location.replace(portal.data.url);
		} else {
			alert("თქვენ არ გაქვთ შეძენილი პაკეტი.");
		}
	};

	return (
		<Menu
			as="div"
			className="relative inline-block text-left cursor-pointer">
			<div>
				<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md transition duration-500 hover:scale-110 bg-transparent px-3 py-2 text-xl font-semibold text-white">
					{user.email}
					<MdSwitchAccount
						className="mr-1 h-5 w-5e"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block w-full px-4 py-2 text-left text-sm"
									)}
									onClick={() => {
										resetPassword(user.email);
										resetPasswordToggle();
									}}>
									პაროლის შეცვლა
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}
									onClick={createPortal}>
									პაკეტის მართვა
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block w-full px-4 py-2 text-left text-sm"
									)}
									onClick={logout}>
									გამოსვლა
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
