'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, CreditCard, Calendar, Lock, Tag, ArrowLeft, ArrowRight, Building, CheckCircle, Banknote, Smartphone, University, Wallet, Copy } from 'lucide-react';
import PaymentResultModal from './PaymentResultModal';
import { useLanguage } from '../../context/LanguageContext';

export default function CheckoutPage() {
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedModules, setSelectedModules] = useState<string[]>([]);
	const [showPlanDropdown, setShowPlanDropdown] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState('');
		const [formData, setFormData] = useState({
		// Personal details
		name: '',
		email: '',
		phone: '',
		city: '',
		// Company details
		companyName: '',
		companyAddress: '',
		vatNumber: '',
		domainName: '',
		// Payment details
		cardName: '',
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		couponCode: '',
		transactionReference: '',
	});
	const [billing, setBilling] = useState('Monthly');
	const [additionalUsers, setAdditionalUsers] = useState(0); // extra users above 2 included
	const [showPaymentResult, setShowPaymentResult] = useState(false);
	const [paymentResultMsg, setPaymentResultMsg] = useState('');
	const [isProcessing, setIsProcessing] = useState(false);
	const [isCouponApplied, setIsCouponApplied] = useState(false);

	const router = useRouter();
	const { t, language } = useLanguage();

	// Plans definition (copied from Pricing.tsx, adjusted for checkout)
	const plans = [
		{
			name: t('pricing_plan_startup_name'),
			priceMonthly: 149,
			priceYearly: 1350,
			includedUsers: 1,
			features: [
				t('pricing_plan_startup_feature1'),
				t('pricing_plan_startup_feature2'),
				t('pricing_plan_startup_feature3'),
				t('pricing_plan_startup_feature4'),
				t('pricing_plan_startup_feature5'),
				t('pricing_plan_startup_feature6'),
				t('pricing_plan_startup_feature7'),
				t('pricing_plan_startup_feature8'),
				t('pricing_plan_startup_feature9'),
				t('pricing_plan_startup_feature10'),
			],
		},
		{
			name: t('pricing_plan_business_name'),
			priceMonthly: 249,
			priceYearly: 2200,
			includedUsers: 3,
			features: [
				t('pricing_plan_business_feature1'),
				t('pricing_plan_business_feature2'),
				t('pricing_plan_business_feature3'),
				t('pricing_plan_business_feature4'),
				t('pricing_plan_business_feature5'),
				t('pricing_plan_business_feature6'),
				t('pricing_plan_business_feature7'),
				t('pricing_plan_business_feature8'),
				t('pricing_plan_business_feature9'),
				t('pricing_plan_business_feature10'),
				t('pricing_plan_business_feature11'),
			],
		},
		{
			name: t('pricing_plan_pro_name'),
			priceMonthly: 399,
			priceYearly: 3800,
			includedUsers: 5,
			features: [
				t('pricing_plan_pro_feature1'),
				t('pricing_plan_pro_feature2'),
				t('pricing_plan_pro_feature3'),
				t('pricing_plan_pro_feature4'),
				t('pricing_plan_pro_feature5'),
				t('pricing_plan_pro_feature6'),
				t('pricing_plan_pro_feature7'),
				t('pricing_plan_pro_feature8'),
				t('pricing_plan_pro_feature9'),
				t('pricing_plan_pro_feature10'),
				t('pricing_plan_pro_feature11'),
			],
		},
	];

	const optionalModules = [
		{ id: 'inventory', name: t('checkout_module_inventory'), price: 15 },
		{ id: 'crm', name: t('checkout_module_crm'), price: 25 },
		{ id: 'accounting', name: t('checkout_module_accounting'), price: 20 },
		{ id: 'analytics', name: t('checkout_module_analytics'), price: 12 },
		{ id: 'userAddition', name: t('checkout_module_user_addition'), price: 10 },
	];

	// Get selected plan from query string
	const searchParams =
		typeof window !== 'undefined'
			? new URLSearchParams(window.location.search)
			: null;
	const initialPlanName = searchParams ? searchParams.get('plan') : null;
	const initialPlan = plans.find((p) => p.name === initialPlanName) || plans[0];

	const [selectedPlan, setSelectedPlan] = useState(initialPlan);

	// When selectedPlan changes, reset additionalUsers to minimum included
	useEffect(() => {
		setAdditionalUsers(selectedPlan.includedUsers);
	}, [selectedPlan]);

	// Reset coupon applied state if code changes
	useEffect(() => {
		setIsCouponApplied(false);
	}, [formData.couponCode]);

	const steps = [
		{ number: 1, title: t('checkout_step_personal'), icon: User },
		{ number: 2, title: t('checkout_step_modules'), icon: Tag },
		{ number: 3, title: t('checkout_step_company'), icon: Building },
		{ number: 4, title: t('checkout_step_confirmation'), icon: CheckCircle },
	];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleModuleToggle = (moduleId: string) => {
		setSelectedModules(prev => 
			prev.includes(moduleId) 
				? prev.filter(id => id !== moduleId)
				: [...prev, moduleId]
		);
	};

	const handleAdditionalUsersChange = (value: number) => {
		const num = Math.max(0, Number(value));
		setAdditionalUsers(num);
	};

	const handleNext = () => {
		if (currentStep < 4) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = () => {
		if (isProcessing || showPaymentResult) return;
		setIsProcessing(true);
		if (paymentMethod === 'card') {
			setPaymentResultMsg('Payment successfully done!');
		} else if (paymentMethod === 'transfer') {
			setPaymentResultMsg('We will check your payment within a day max.');
		}
		setShowPaymentResult(true);
		setTimeout(() => {
			setIsProcessing(false);
			// Optionally reset or redirect here
		}, 2200);
	};

	// Calculate totals (MAD currency)
	const billingIsMonthly = billing === 'Monthly';
	const planPrice = billingIsMonthly ? selectedPlan.priceMonthly : selectedPlan.priceYearly;
	const includedUsers = selectedPlan.includedUsers;
	const extraUsers = Math.max(0, additionalUsers - includedUsers);
	const additionalUserPrice = billingIsMonthly
		? 10 * extraUsers
		: Math.round(10 * extraUsers * 12 * 0.7);

	const modulePrice = (module: { id: string; name: string; price: number }) => {
		if (module.id === 'userAddition') {
			return additionalUserPrice;
		}
		return billingIsMonthly ? module.price : Math.round(module.price * 12 * 0.7);
	};
	const subtotal =
		planPrice +
		selectedModules.reduce((sum, moduleId) => {
			const mod = optionalModules.find((m) => m.id === moduleId);
			return sum + (mod ? modulePrice(mod) : 0);
		}, 0) +
		additionalUserPrice;

	// Coupon logic
	const validCoupon = formData.couponCode.trim().toLowerCase() === "ovalo10";
	const discount = isCouponApplied && validCoupon ? Math.round(subtotal * 0.10) : 0;
	const total = subtotal - discount;

	// Reset coupon applied state if code changes
	useEffect(() => {
		setIsCouponApplied(false);
	}, [formData.couponCode]);

	const paymentMethods = [
		{
			id: 'card',
			name: t('checkout_payment_card'),
			icon: CreditCard,
			description: t('checkout_payment_card_desc'),
			color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
			textColor: 'text-white'
		},
		{
			id: 'transfer',
			name: t('checkout_payment_transfer'),
			icon: University,
			description: t('checkout_payment_transfer_desc'),
			color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
			textColor: 'text-white'
		}
	];

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
						<h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">{t('checkout_step_personal')}</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('checkout_field_fullname')}
								</label>
								<div className="relative">
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										placeholder={t('checkout_placeholder_fullname')}
										className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black"
									/>
									<User className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('checkout_field_email')}
								</label>
								<div className="relative">
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder={t('checkout_placeholder_email')}
										className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black"
									/>
									<Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										{t('checkout_field_phone')}
									</label>
									<div className="relative">
										<input
											type="tel"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											placeholder={t('checkout_placeholder_phone')}
											className={`w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black${language === 'ar' ? ' text-right' : ''}`}
										/>
										{language === 'ar' ? (
											<span className="absolute right-9 top-3.5 text-gray-400 text-sm"></span>
										) : null}
										<Phone className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										{t('checkout_field_city')}
									</label>
									<div className="relative">
										<input
											type="text"
											name="city"
											value={formData.city}
											onChange={handleInputChange}
											placeholder={t('checkout_placeholder_city')}
											className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black"
										/>
										<MapPin className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
									</div>
								</div>
							</div>
						</div>
						<div className="mb-4 mt-6 sm:mt-10">
							<label className="flex items-start sm:items-center gap-3 cursor-pointer select-none">
								<span className="relative flex items-center mt-0.5 sm:mt-0 flex-shrink-0">
									<input
										type="checkbox"
										className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md bg-white checked:bg-[#0357cb] checked:border-[#0357cb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0357cb]"
										required
									/>
									<span className="absolute left-0 top-0 w-5 h-5 flex items-center justify-center pointer-events-none">
										<CheckCircle className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
									</span>
								</span>
								<span className="text-sm text-gray-600 leading-relaxed">
									{t('checkout_accept_terms_prefix')}
									<a href="#" className="text-[#0357cb] underline hover:no-underline">
										{t('checkout_accept_terms_terms')}
									</a>
									{t('checkout_accept_terms_comma')}
									<a href="#" className="text-[#0357cb] underline hover:no-underline">
										{t('checkout_accept_terms_privacy')}
									</a>
									{t('checkout_accept_terms_and')}
									<a href="#" className="text-[#0357cb] underline hover:no-underline">
										{t('checkout_accept_terms_offer')}
									</a>
									{t('checkout_accept_terms_dot')}
								</span>
							</label>
						</div>
					</div>
				);

			case 2:
				return (
					<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
						<h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">{t('checkout_step_modules')}</h2>
						<div className="space-y-4">
							{optionalModules.filter(m => m.id !== 'userAddition').map((module) => (
								<div
									key={module.id}
									className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
										selectedModules.includes(module.id)
											? 'border-[#0357cb] bg-blue-50'
											: 'border-gray-200 hover:border-gray-300'
									}`}
									onClick={() => handleModuleToggle(module.id)}
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className={`w-5 h-5 border-2 rounded ${
												selectedModules.includes(module.id)
													? 'bg-[#0357cb] border-[#0357cb]'
													: 'border-gray-300'
											}`}>
												{selectedModules.includes(module.id) && (
													<CheckCircle className="w-full h-full text-white" />
												)}
											</div>
											<span className="font-medium text-gray-900 text-sm sm:text-base">{module.name}</span>
										</div>
										<span className="font-bold text-[#0357cb] text-sm sm:text-base whitespace-nowrap ml-2">
											+{billingIsMonthly ? `${module.price} ${t('checkout_currency')}` : `${Math.round(module.price * 12 * 0.7)} ${t('checkout_currency')}`}/{billingIsMonthly ? t('checkout_month') : t('checkout_year')}
										</span>
									</div>
								</div>
							))}
							<div className="p-4 border-2 rounded-xl bg-blue-50 border-[#0357cb]">
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
									<div className="flex items-center gap-4">
										<User className="w-6 h-6 text-[#0357cb] flex-shrink-0" />
										<div className="flex flex-col">
											<span className="font-medium text-gray-900">
	{includedUsers} {t('checkout_users')}
</span>
<span className="font-bold text-[#0357cb] text-sm">
	{t('checkout_included')}
</span>
										</div>
										<div className="flex items-center rounded-full border border-gray-300 overflow-hidden shadow px-2 py-1 bg-white/30 backdrop-blur-md">
											<button
												type="button"
												className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/60 hover:bg-gray-200/80 text-[#0357cb] font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
												onClick={() => handleAdditionalUsersChange(additionalUsers - 1)}
												disabled={additionalUsers <= includedUsers}
											>
												−
											</button>
											<div className="px-4 flex items-center justify-center">
												<span className="text-black font-semibold text-lg">{additionalUsers}</span>
											</div>
											<button
												type="button"
												className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/60 hover:bg-gray-200/80 text-[#0357cb] font-bold text-lg transition-colors"
												onClick={() => handleAdditionalUsersChange(additionalUsers + 1)}
											>
												+
											</button>
										</div>
									</div>
									<div className="text-right">
										<div className="font-bold text-[#0357cb] text-sm sm:text-base">
											{extraUsers === 0
												? t('checkout_extra_user_price', { price: 10, period: billingIsMonthly ? t('checkout_month') : t('checkout_year') })
												: t('checkout_extra_user_total', { price: billingIsMonthly ? 10 * extraUsers : Math.round(10 * extraUsers * 12 * 0.7), period: billingIsMonthly ? t('checkout_month') : t('checkout_year') })
											}
										</div>
									</div>
								</div>
							</div>
							<p className="text-sm text-gray-600 mt-4">
								{t('checkout_modules_info')}
							</p>
						</div>
					</div>
				);

			case 3:
				return (
					<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
						<h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">{t('checkout_step_company')}</h2>
						
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('checkout_field_company_name')}
								</label>
								<div className="relative">
									<input
										type="text"
										name="companyName"
										value={formData.companyName}
										onChange={handleInputChange}
										placeholder={t('checkout_placeholder_company_name')}
										className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black"
									/>
									<Building className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
								</div>
							</div>

							{/* Domain Name Field - Made more mobile friendly */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('checkout_field_domain_name')}
								</label>
								<div className="relative flex items-center">
									<span className="absolute left-4 text-gray-400 select-none text-sm sm:text-base" dir="ltr">https://</span>
									<input
										type="text"
										name="domainName"
										value={formData.domainName || ''}
										onChange={handleInputChange}
										placeholder={t('checkout_placeholder_domain_name')}
										className="w-full pl-16 sm:pl-[70px] pr-20 sm:pr-[90px] py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black text-sm sm:text-base"
									/>
									<span className="absolute right-4 text-gray-400 select-none text-xs sm:text-base" dir="ltr">.riadatlas4seasons.com</span>
								</div>
								<p className="text-xs text-gray-500 mt-1">{t('checkout_domain_name_info')}</p>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('checkout_field_company_address')}
								</label>
								<div className="relative">
									<input
										type="text"
										name="companyAddress"
										value={formData.companyAddress}
										onChange={handleInputChange}
										placeholder={t('checkout_placeholder_company_address')}
										className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black"
									/>
									<MapPin className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('checkout_field_vat_number')} ({t('checkout_optional')})
								</label>
								<div className="relative">
									<input
										type="text"
										name="vatNumber"
										value={formData.vatNumber}
										onChange={handleInputChange}
										placeholder={t('checkout_placeholder_vat_number')}
										className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black"
									/>
									<Tag className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
								</div>
							</div>
						</div>
					</div>
				);

			case 4:
				return (
					<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
						<h2 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6">{t('checkout_step_confirmation')}</h2>
						
						<div className="space-y-8">
							{/* Payment Method Selection - Made more mobile friendly */}
							{currentStep === 4 && (
								<div>
									<h3 className="font-semibold text-gray-900 mb-4">{t('checkout_choose_payment_method')}</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{paymentMethods.map((method) => {
											let imgSrc = '';
											if (method.id === 'card') {
												imgSrc = '/assets/icons/cards.png';
											} else if (method.id === 'transfer') {
												imgSrc = '/assets/icons/CDM.png';
											}
											const isActive = paymentMethod === method.id;
											return (
												<div key={method.id}>
													<label
														className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer w-full
															${isActive ? 'border-[#0357cb] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}
														`}
														style={{ minWidth: 0 }}
													>
														<input
															type="radio"
															name="paymentMethod"
															value={method.id}
															checked={isActive}
															onChange={() => setPaymentMethod(method.id)}
															className="form-radio h-5 w-5 text-[#0357cb] accent-[#0357cb] border-gray-300 focus:ring-[#0357cb] flex-shrink-0"
														/>
														<img src={imgSrc} alt={method.name} className="w-8 h-8 object-contain flex-shrink-0" />
														<span className={`text-sm sm:text-base font-semibold ${isActive ? 'text-[#0357cb]' : 'text-gray-700'}`}>{method.name}</span>
													</label>
													<div className="text-xs text-gray-500 mt-2 text-left px-1">{method.description}</div>
												</div>
											);
										})}
									</div>
								</div>
							)}

							{/* Card Details - Made more mobile friendly */}
							{paymentMethod === 'card' && (
								<div className="space-y-6 mt-8">
									<h3 className="font-semibold text-gray-900">{t('checkout_card_details')}</h3>
									{/* Card Form and Visual - Stack on mobile */}
									<div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
										{/* Card Form - top on mobile */}
										<div className="flex-1 order-2 lg:order-1">
											<div className="space-y-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														{t('checkout_card_name')}
													</label>
													<input
														type="text"
														name="cardName"
														value={formData.cardName}
														onChange={handleInputChange}
														placeholder={t('checkout_card_name_placeholder')}
														className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														{t('checkout_card_number')}
													</label>
													<input
														type="text"
														name="cardNumber"
														value={formData.cardNumber}
														onChange={(e) => {
															const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
															const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
															setFormData(prev => ({
																...prev,
																cardNumber: formattedValue
															}));
														}}
														placeholder={t('checkout_card_number_placeholder')}
														maxLength={19}
														className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black font-mono text-sm sm:text-base"
													/>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															{t('checkout_card_expiry')}
														</label>
														<input
															onChange={(e) => {
																let value = e.target.value.replace(/\D/g, '');
																if (value.length >= 2) {
																	value = value.substring(0, 2) + '/' + value.substring(2, 4);
																}
																setFormData(prev => ({
																	...prev,
																	expiryDate: value
																}));
															}}
															placeholder="MM/YY"
															maxLength={5}
															className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black font-mono text-sm sm:text-base"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															{t('checkout_card_cvv')}
														</label>
														<input
															type="text"
															name="cvv"
															value={formData.cvv}
															onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
																const value = e.target.value.replace(/\D/g, '');
																setFormData(prev => ({
																	...prev,
																	cvv: value.substring(0, 4)
																}));
															}}
															placeholder="123"
															maxLength={4}
															className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black font-mono text-sm sm:text-base"
														/>
													</div>
												</div>
											</div>
										</div>
										{/* Card Visual - bottom on mobile, smaller */}
										<div className="flex-1 mt-0 mb-8 lg:mt-9 flex justify-center items-start order-1 lg:order-2">
											<div className="w-full max-w-xs lg:max-w-sm">
												<div className="relative h-44 lg:h-56 rounded-2xl shadow-2xl transform-gpu">
													{/* Card Background */}
													<div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden">
														{/* Card Content */}
														<div className="relative p-4 lg:p-6 h-full flex flex-col justify-between">
															{/* Top Section */}
															<div className="flex justify-between items-start">
																<div className="text-white/60 text-xs lg:text-sm font-medium">Riad Atlas 4 Seasons</div>
																<div className="flex gap-1">
																	{/* Card Brand Logo */}
																	{formData.cardNumber.replace(/\s/g, '').startsWith('4') ? (
																		<img src="/assets/icons/visa.png" alt="Visa" className="w-8 lg:w-10 h-5 lg:h-7 object-contain" />
																	) : (
																		<>
																			<div className="w-6 lg:w-8 h-4 lg:h-5 bg-red-500 rounded-sm opacity-90"></div>
																			<div className="w-6 lg:w-8 h-4 lg:h-5 bg-orange-400 rounded-sm opacity-90 -ml-2"></div>
																		</>
																	)}
																</div>
															</div>
															{/* Card Number */}
															<div className="space-y-4">
																<div className="text-white font-mono text-base lg:text-lg tracking-wider">
																	{formData.cardNumber || '•••• •••• •••• ••••'}
																</div>
															</div>
															{/* Bottom Section */}
															<div className="flex justify-between items-end">
																<div className="space-y-1">
																	<div className="text-white/60 text-xs">{t('checkout_card_holder')}</div>
																	<div className="text-white font-medium text-xs lg:text-sm">
																		{formData.cardName || 'YOUR NAME'}
																	</div>
																</div>
																<div className="space-y-1 text-right">
																	<div className="text-white/60 text-xs">{t('checkout_expires_cvv')}</div>
																	<div className="flex gap-2 items-center">
																		<div className="text-white font-medium text-xs lg:text-sm">
																			{formData.expiryDate || 'MM/YY'}
																		</div>
																		<span className="text-white/60 text-xs">|</span>
																		<div className="text-white font-mono text-xs lg:text-sm px-1 lg:px-2 py-1 bg-black/30 rounded">
																			{formData.cvv || '•••'}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Bank Transfer - Made more mobile friendly */}
							{paymentMethod === 'transfer' && (
								<div className="p-4 sm:p-6 rounded-2xl border border-gray-200 mt-8 bg-white/10 backdrop-blur-lg shadow-lg">
									<div className="flex items-center gap-4 mb-4">
										<img src="/assets/icons/CDM.png" alt="CDM Bank" className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl object-contain bg-white/80 backdrop-blur flex-shrink-0" />
										<div className="min-w-0">
											<h3 className="font-semibold text-black text-sm sm:text-base">{t('checkout_bank_transfer_details')}</h3>
											<p className="text-black text-xs sm:text-sm">{t('checkout_bank_transfer_desc')}</p>
										</div>
									</div>
									<div className="space-y-4">
										<div className="p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/20 backdrop-blur-md shadow">
											<div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
												{/* Left: Company and bank info */}
												<div className="flex-1 mb-4 lg:mb-0">
													<p className="font-medium mb-3 text-black text-sm sm:text-base">{t('checkout_bank_account_details')}:</p>
													<div className="space-y-2 text-xs sm:text-sm font-mono">
														<div className="flex items-center justify-between gap-2">
															<div className="flex items-center gap-2 min-w-0">
																<span className="font-semibold text-gray-700 flex-shrink-0">{t('checkout_rib')}:</span>
																<span className="font-bold text-gray-700 truncate">021450000010103008813208</span>
															</div>
															<button
																type="button"
																className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center flex-shrink-0"
																onClick={() => navigator.clipboard.writeText('021450000010103008813208')}
																title={t('checkout_copy_rib')}
															>
																<Copy className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" />
															</button>
														</div>
														<div className="flex items-center justify-between gap-2">
															<div className="flex items-center gap-2 min-w-0">
																<span className="font-semibold text-gray-700 flex-shrink-0">{t('checkout_swift_code')}:</span>
																<span className="font-bold text-gray-700">CDMAMAMC</span>
															</div>
															<button
																type="button"
																className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center flex-shrink-0"
																onClick={() => navigator.clipboard.writeText('CDMAMAMC')}
																title={t('checkout_copy_bic')}
															>
																<Copy className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" />
															</button>
														</div>
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<span className="font-semibold text-gray-700 flex-shrink-0">{t('checkout_agency')}:</span>
																<span className="font-bold text-gray-700">MARRAKECH VICTOR HUGO</span>
															</div>
														</div>
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<span className="font-semibold text-gray-700 flex-shrink-0">{t('checkout_amount')}:</span>
																<span className="font-bold text-base sm:text-lg text-gray-700">{total} {t('checkout_currency')}</span>
															</div>
														</div>
													</div>
												</div>
												{/* Right: QR code and company name */}
												<div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center lg:items-end gap-4 sm:gap-2">
													<span className="font-bold text-black text-sm sm:text-base">OUZTECHNOLOGY</span>
													<img src="/assets/img/cdm-qr.png" alt="Bank QR Code" className="w-16 sm:w-20 h-16 sm:h-20 rounded-md border border-gray-400 bg-white/60 backdrop-blur-md flex-shrink-0" />
												</div>
											</div>
										</div>
										{/* Transaction Reference Number Field */}
										<div className="mb-2">
											<label className="block text-sm font-medium text-gray-700 mb-1">
												{t('checkout_transaction_reference')}
											</label>
											<input
												type="text"
												name="transactionReference"
												value={formData.transactionReference || ''}
												onChange={e => setFormData(prev => ({ ...prev, transactionReference: e.target.value }))}
												placeholder={t('checkout_placeholder_transaction_reference')}
												className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0357cb] focus:border-transparent text-black text-sm sm:text-base"
											/>
											{/* Subtext below field */}
											<div className="text-xs text-gray-600 mt-2">
												{t('checkout_transaction_reference_info')}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-8">
			<div className="max-w-7xl mx-auto">
				{/* Back Button & Step Indicator - Stack on mobile */}
				<div
					className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 ${
						language === 'ar' ? 'sm:flex-row-reverse' : ''
					}`}
				>
					{/* Back Button */}
					<div className={language === 'ar' ? 'sm:ml-0 sm:mr-auto' : ''} style={language === 'ar' ? { marginLeft: '0', marginRight: 'auto' } : {}}>
						<button 
							onClick={() => {
								router.push('/#pricing');
							}}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100 self-start`}
						>
							<ArrowLeft className="w-5 h-5" />
							{t('checkout_back')}
						</button>
					</div>
					{/* Step Indicator - Responsive: wrap to next line if no space */}
					<div className={language === 'ar' ? 'sm:mr-0 sm:ml-auto' : ''} style={language === 'ar' ? { marginRight: '0', marginLeft: 'auto' } : {}}>
						{/* Mobile: no pill, just flex row, centered */}
						<div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:hidden justify-center">
							{steps.map((step, index) => (
								<React.Fragment key={step.number}>
									<div className="flex items-center gap-2 flex-shrink-0">
										<div className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs ${
											currentStep >= step.number
												? 'bg-[#0357cb] text-white'
												: 'bg-gray-200 text-gray-600'
										}`}>
											{step.number}
										</div>
									</div>
									{index < steps.length - 1 && (
										<div className={`w-4 h-px flex-shrink-0 ${
											currentStep > step.number ? 'bg-[#0357cb]' : 'bg-gray-300'
										}`} />
									)}
								</React.Fragment>
							))}
						</div>
						{/* Desktop: pill background */}
						<div className="hidden sm:flex flex-wrap items-center gap-x-4 gap-y-0 bg-white rounded-full px-6 py-4 shadow-sm">
							{steps.map((step, index) => (
								<React.Fragment key={step.number}>
									<div className="flex items-center gap-3 flex-shrink-0">
										<div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
											currentStep >= step.number
												? 'bg-[#0357cb] text-white'
												: 'bg-gray-200 text-gray-600'
										}`}>
											{step.number}
										</div>
										<div>
											<div className={`font-medium text-base ${
												currentStep >= step.number ? 'text-[#0357cb]' : 'text-gray-600'
											}`}>
												{step.title}
											</div>
										</div>
									</div>
									{index < steps.length - 1 && (
										<div className={`w-8 h-px flex-shrink-0 ${
											currentStep > step.number ? 'bg-[#0357cb]' : 'bg-gray-300'
										}`} />
									)}
								</React.Fragment>
							))}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
					{/* Left side - Step Content */}
					<div className="lg:col-span-2">
						{/* Payment result animation overlay - Fixed for mobile */}
						<div className="relative">
							<PaymentResultModal
								show={showPaymentResult}
								paymentMethod={paymentMethod}
								message={paymentResultMsg}
								amount={`${total} ${t('checkout_currency')}`}
								onClose={() => setShowPaymentResult(false)}
							/>
							{renderStepContent()}
						</div>
						
						{/* Navigation Buttons - Better spacing on mobile */}
						<div className="flex justify-between mt-4 sm:mt-6 gap-3">
							{language === 'ar' ? (
								<>
									{currentStep < 4 ? (
										<button
											onClick={handleNext}
											disabled={isProcessing || showPaymentResult}
											className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-[#0357cb] text-white rounded-xl font-medium hover:bg-[#0246a1] transition-colors disabled:opacity-60 text-sm sm:text-base"
										>
											{t('checkout_next')}
											<ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
										</button>
									) : (
										<button
											onClick={handleSubmit}
											disabled={!paymentMethod || isProcessing || showPaymentResult}
											className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${
												paymentMethod && !isProcessing && !showPaymentResult
													? 'bg-[#0357cb] text-white hover:bg-[#0246a1]'
													: 'bg-gray-300 text-gray-500 cursor-not-allowed'
											}`}
										>
											<CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
											<span className="hidden sm:inline">{paymentMethod === 'card' ? t('checkout_pay_now') : t('checkout_confirm_order')}</span>
											<span className="sm:hidden">{paymentMethod === 'card' ? t('checkout_pay') : t('checkout_confirm')}</span>
										</button>
									)}
									<button
										onClick={handleBack}
										disabled={currentStep === 1 || isProcessing || showPaymentResult}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100 self-start`}
									>
										<ArrowLeft className="w-5 h-5" />
										<span className="hidden sm:inline">{t('checkout_previous')}</span>
										<span className="sm:hidden">{t('checkout_back')}</span>
									</button>
								</>
							) : (
								<>
									<button
										onClick={handleBack}
										disabled={currentStep === 1 || isProcessing || showPaymentResult}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100 self-start`}
									>
										<ArrowLeft className="w-5 h-5" />
										<span className="hidden sm:inline">{t('checkout_previous')}</span>
										<span className="sm:hidden">{t('checkout_back')}</span>
									</button>
									{currentStep < 4 ? (
										<button
											onClick={handleNext}
											disabled={isProcessing || showPaymentResult}
											className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-[#0357cb] text-white rounded-xl font-medium hover:bg-[#0246a1] transition-colors disabled:opacity-60 text-sm sm:text-base"
										>
											{t('checkout_next')}
											<ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
										</button>
									) : (
										<button
											onClick={handleSubmit}
											disabled={!paymentMethod || isProcessing || showPaymentResult}
											className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${
												paymentMethod && !isProcessing && !showPaymentResult
													? 'bg-[#0357cb] text-white hover:bg-[#0246a1]'
													: 'bg-gray-300 text-gray-500 cursor-not-allowed'
											}`}
										>
											<CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
											<span className="hidden sm:inline">{paymentMethod === 'card' ? t('checkout_pay_now') : t('checkout_confirm_order')}</span>
											<span className="sm:hidden">{paymentMethod === 'card' ? t('checkout_pay') : t('checkout_confirm')}</span>
										</button>
									)}
								</>
							)}
						</div>
					</div>
					{/* Right side - Cart Summary - Better mobile handling */}
					<div className="lg:col-span-1 order-first lg:order-last">
						<div className="bg-gradient-to-br from-[#0357cb] to-[#0246a1] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white sticky top-4 lg:top-8">
							{/* Billing Toggle Pill Switch - More compact on mobile */}
							<div className="flex justify-center items-center mb-4 sm:mb-6">
								<div className="flex bg-white/10 rounded-full p-1 gap-1 sm:gap-2 w-full sm:w-auto">
									<button
										className={`px-3 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 flex-1 sm:flex-initial
											${billing === "Monthly" ? "bg-white text-[#0357cb] shadow" : "bg-transparent text-white/80"}
										`}
										onClick={() => setBilling("Monthly")}
									>
										{t('checkout_billing_monthly')}
									</button>
									<button
										className={`flex items-center justify-center px-2 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 flex-1 sm:flex-initial
											${billing === "Yearly" ? "bg-white text-[#0357cb] shadow" : "bg-transparent text-white/80"}
										`}
										onClick={() => setBilling("Yearly")}
									>
										<span className="hidden sm:inline">{t('checkout_billing_yearly')}</span>
										<span className="sm:hidden">{t('checkout_billing_year')}</span>
<span
	className={`ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-[#d1fae5] text-[#059669] rounded-full text-xs font-bold ${
		language === 'ar' ? 'ml-0 mr-4 sm:mr-8' : ''
	}`}
>
	<span className="hidden sm:inline">{t('checkout_save_30')}</span>
	<span className="sm:hidden">{t('checkout_save_30')}</span>
</span>
									</button>
								</div>
							</div>

							{/* Plan Selection - More compact dropdown on mobile */}
							<div className="mb-4 sm:mb-6">
								<h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">{t('checkout_selected_plan')}</h4>
								<div className="relative">
									<div 
										className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 cursor-pointer hover:bg-white/20 transition-all"
										onClick={() => setShowPlanDropdown(!showPlanDropdown)}
									>
										<div className="flex items-center justify-between">
											<div className="min-w-0 flex-1">
												<span className="font-bold text-sm sm:text-base block truncate">{selectedPlan.name}</span>
												<div className="text-xs sm:text-sm text-white/80 mt-1">
													{selectedPlan.features.length} {t('checkout_features_included')}
												</div>
											</div>
											<div className="flex items-center gap-2 sm:gap-3 ml-2">
												<span className="text-xs sm:text-base font-bold whitespace-nowrap">
													{billingIsMonthly ? `${selectedPlan.priceMonthly} ${t('checkout_currency')}` : `${selectedPlan.priceYearly} ${t('checkout_currency')}`}
													<span className="block sm:inline text-xs opacity-80">/{billingIsMonthly ? t('checkout_month') : t('checkout_year')}</span>
												</span>
												<div className={`transition-transform ${showPlanDropdown ? 'rotate-180' : ''}`}>
													<svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
													</svg>
												</div>
											</div>
										</div>
									</div>

									{/* Dropdown Menu - Better mobile handling */}
									{showPlanDropdown && (
										<div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden max-h-80 overflow-y-auto">
											{plans.map((plan) => (
												<div
													key={plan.name}
													className={`p-3 sm:p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
														selectedPlan.name === plan.name ? 'bg-blue-50 border-l-4 border-[#0357cb]' : ''
													}`}
													onClick={() => {
														setSelectedPlan(plan);
														setShowPlanDropdown(false);
														router.replace(`/checkout?plan=${encodeURIComponent(plan.name)}`, { scroll: false });
													}}
												>
													<div className="flex items-center justify-between">
														<div className="min-w-0 flex-1">
															<span className={`font-bold text-sm sm:text-base ${selectedPlan.name === plan.name ? 'text-[#0357cb]' : 'text-gray-900'}`}>
																{plan.name}
															</span>
															<div className="text-xs sm:text-sm text-gray-600 mt-1">
																{plan.features.length} {t('checkout_features')}
															</div>
														</div>
														<span className={`text-xs sm:text-base font-bold ml-2 ${selectedPlan.name === plan.name ? 'text-[#0357cb]' : 'text-gray-900'}`}>
															{billingIsMonthly ? `${plan.priceMonthly} ${t('checkout_currency')}` : `${plan.priceYearly} ${t('checkout_currency')}`}
															<span className="block text-xs opacity-80">/{billingIsMonthly ? 'month' : 'year'}</span>
														</span>
													</div>
													{selectedPlan.name === plan.name && (
														<div className="mt-3 pt-3 border-t border-gray-200">
															<ul className="text-xs text-gray-600 space-y-2">
																{plan.features.slice(0, 3).map((feature, idx) => (
																	<li key={idx} className="flex items-start gap-2">
																		<CheckCircle className="w-3 h-3 text-[#0357cb] mt-0.5 flex-shrink-0" />
																		<span className="leading-tight">{feature}</span>
																	</li>
																))}
																{plan.features.length > 3 && (
																	<li className="text-[#0357cb] font-medium">
																		{t('checkout_more_features', { count: plan.features.length - 3 })}
																	</li>
																)}
															</ul>
														</div>
													)}
												</div>
											))}
										</div>
									)}
								</div>
							</div>

							{/* Coupon Code - More compact on mobile */}
							<div className="mb-4 sm:mb-6">
								<h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">{t('checkout_promo_code')}</h4>
								<div className="flex items-center gap-2">
									<div className="relative flex-1">
										{language === 'ar' && (
		<Tag className="absolute left-3 sm:left-5 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-white/70" />
	)}
										<input
											type="text"
											name="couponCode"
											value={formData.couponCode}
											onChange={handleInputChange}
											placeholder={t('checkout_placeholder_promo_code')}
											className={`w-full px-3 sm:px-4 py-2 sm:py-3 pr-20 sm:pr-28 bg-transparent border border-white/40 ring-2 ring-[#0357cb] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#0357cb] rounded-full text-sm sm:text-base${language === 'ar' ? ' text-right' : ''}`}
											disabled={isCouponApplied}
										/>
										{language !== 'ar' && (
		<Tag className="absolute right-16 sm:right-28 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-white/70" />
	)}
										{!isCouponApplied ? (
											<button 
												className="absolute right-1 top-1 bottom-1 px-3 sm:px-6 bg-white/20 font-medium hover:bg-white/30 transition-colors text-xs sm:text-sm border-none rounded-full flex items-center"
												onClick={() => {
													if (formData.couponCode.trim()) {
														setIsCouponApplied(true);
													}
												}}
											>
												{t('checkout_apply')}
											</button>
										) : (
											<button
												className="absolute right-1 top-1 bottom-1 px-2 sm:px-6 bg-red-500/80 font-medium hover:bg-red-600/90 transition-colors text-xs sm:text-sm border-none rounded-full flex items-center text-white"
												onClick={() => {
													setIsCouponApplied(false);
													setFormData(prev => ({ ...prev, couponCode: "" }));
												}}
											>
												<span className="hidden sm:inline">{t('checkout_remove')}</span>
												<span className="sm:hidden">×</span>
											</button>
										)}
									</div>
								</div>
								<div className="mt-2 text-xs text-white/80">
									{t('checkout_promo_code_info')}
								</div>
							</div>
							
							{/* Order Summary - More compact spacing on mobile */}
							<div className="space-y-2 sm:space-y-3 py-3 sm:py-4 border-t border-white/20">
								<div className="flex justify-between text-sm sm:text-base">
									<span className="text-white/90 font-semibold">{t('checkout_plan')} {selectedPlan.name}</span>
									<span className="font-bold whitespace-nowrap">
										{planPrice} {t('checkout_currency')}
									</span>
								</div>
								{selectedModules.map(moduleId => {
									const mod = optionalModules.find(m => m.id === moduleId);
									return mod ? (
										<div key={moduleId} className="flex justify-between text-sm sm:text-base">
											<span className="text-white/80 font-semibold truncate pr-2">{mod.name}</span>
											<span className="font-bold whitespace-nowrap">+{modulePrice(mod)} {t('checkout_currency')}</span>
										</div>
									) : null;
								})}
								{/* Show additional users in blue card */}
								{extraUsers > 0 && (
									<div className="flex justify-between text-sm sm:text-base">
										<span className="text-white/80 font-semibold truncate pr-2">{includedUsers + extraUsers} Users ({extraUsers} extra)</span>
										<span className="font-bold whitespace-nowrap">+{additionalUserPrice} {t('checkout_currency')}/{billingIsMonthly ? t('checkout_month_short') : t('checkout_year_short')}</span>
									</div>
								)}
								
								{/* Only show subtotal and discount if coupon is applied and discount > 0 */}
								{isCouponApplied && validCoupon && (
									<>
										<div className="flex justify-between text-sm sm:text-base border-t border-white/20 pt-2 sm:pt-3">
											<span className="text-white/90 font-semibold">{t('checkout_subtotal')}</span>
											<span className="font-bold whitespace-nowrap">{subtotal} {t('checkout_currency')}</span>
										</div>
										<div className="flex justify-between text-sm sm:text-base">
											<span className="text-white/90 font-semibold">{t('checkout_discount')}</span>
											<span className="font-bold whitespace-nowrap">-{discount} {t('checkout_currency')}</span>
										</div>
									</>
								)}
								<div className="flex justify-between text-lg sm:text-2xl font-bold pt-2 border-t border-white/20">
									<span className="truncate pr-2">{billingIsMonthly ? t('checkout_monthly_total') : t('checkout_yearly_total')}</span>
									<span className="whitespace-nowrap">{total} {t('checkout_currency')}</span>
								</div>
							</div>

							{/* Security Badge */}
							<div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
								<Lock className="w-3 sm:w-4 h-3 sm:h-4" />
								<span>{t('checkout_secure_payment')}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}